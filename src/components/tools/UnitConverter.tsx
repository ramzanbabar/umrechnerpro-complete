'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRightLeft, Copy, Check, RotateCcw } from 'lucide-react';
import { formatGermanNumber, parseGermanNumber, smartFormat } from '@/lib/formatters';
import { UnitDefinition, SubConversion } from '@/lib/tools';
import { toast } from 'sonner';

interface UnitConverterProps {
  units: UnitDefinition[];
  convertFn: (value: number, from: string, to: string) => number;
  defaultFrom?: string;
  defaultTo?: string;
  defaultValue?: number;
  popularConversions?: SubConversion[];
  toolSlug: string;
}

export function UnitConverter({
  units,
  convertFn,
  defaultFrom,
  defaultTo,
  defaultValue = 1,
  popularConversions,
  toolSlug,
}: UnitConverterProps) {
  const [fromValue, setFromValue] = useState(defaultValue.toString());
  const [fromUnit, setFromUnit] = useState(defaultFrom || units[0]?.symbol || '');
  const [toUnit, setToUnit] = useState(defaultTo || units[1]?.symbol || '');
  const [copied, setCopied] = useState(false);

  // Parse input value (accepts both comma and dot as decimal separator)
  const numericValue = useMemo(() => {
    const parsed = parseGermanNumber(fromValue);
    return isNaN(parsed) ? 0 : parsed;
  }, [fromValue]);

  // Calculate result
  const result = useMemo(() => {
    if (numericValue === 0) return 0;
    try {
      return convertFn(numericValue, fromUnit, toUnit);
    } catch {
      return 0;
    }
  }, [numericValue, fromUnit, toUnit, convertFn]);

  // Multi-unit results
  const multiResults = useMemo(() => {
    if (numericValue === 0) return [];
    
    const otherUnits = units
      .filter(u => u.symbol !== fromUnit && u.symbol !== toUnit)
      .slice(0, 4);
    
    return otherUnits.map(unit => ({
      unit: unit.symbol,
      name: unit.name,
      value: convertFn(numericValue, fromUnit, unit.symbol),
    }));
  }, [numericValue, fromUnit, toUnit, units, convertFn]);

  // Swap units
  const handleSwap = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(smartFormat(result));
  }, [toUnit, fromUnit, result]);

  // Copy result
  const handleCopy = useCallback(async () => {
    const resultStr = smartFormat(result);
    await navigator.clipboard.writeText(resultStr);
    setCopied(true);
    toast.success('Kopiert!', { description: `${resultStr} ${toUnit} wurde kopiert` });
    setTimeout(() => setCopied(false), 2000);
  }, [result, toUnit]);

  // Reset
  const handleReset = useCallback(() => {
    setFromValue('1');
    setFromUnit(defaultFrom || units[0]?.symbol || '');
    setToUnit(defaultTo || units[1]?.symbol || '');
  }, [defaultFrom, defaultTo, units]);

  // Update URL with state
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('value', fromValue);
    url.searchParams.set('from', fromUnit);
    url.searchParams.set('to', toUnit);
    window.history.replaceState({}, '', url.toString());
  }, [fromValue, fromUnit, toUnit]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-lg">Umrechner</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* From input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Von</label>
          <div className="flex gap-2">
            <Input
              type="text"
              inputMode="decimal"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="text-lg font-medium"
              placeholder="Wert eingeben..."
            />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.symbol} value={unit.symbol}>
                    {unit.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="rounded-full"
            title="Einheiten tauschen"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* To result */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Nach</label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-md border border-input bg-muted/50 px-4 py-2">
              <span className="text-lg font-semibold text-primary">
                {smartFormat(result)}
              </span>
              <span className="text-muted-foreground">{toUnit}</span>
            </div>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.symbol} value={unit.symbol}>
                    {unit.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            Kopieren
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="flex-1">
            <RotateCcw className="h-4 w-4 mr-2" />
            Zurücksetzen
          </Button>
        </div>

        {/* Multi-unit results */}
        {multiResults.length > 0 && numericValue !== 0 && (
          <div className="pt-4 border-t">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Auch in anderen Einheiten:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {multiResults.map((item) => (
                <div
                  key={item.unit}
                  className="flex justify-between items-center p-2 rounded bg-muted/50 text-sm"
                >
                  <span className="text-muted-foreground">{item.unit}</span>
                  <span className="font-medium">{smartFormat(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular conversions */}
        {popularConversions && popularConversions.length > 0 && (
          <div className="pt-4 border-t">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Beliebte Umrechnungen:
            </p>
            <div className="flex flex-wrap gap-2">
              {popularConversions.slice(0, 5).map((conv) => (
                <Badge
                  key={conv.slug}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => {
                    // Navigate to sub-conversion page
                    window.location.href = `/umrechnung/${conv.slug}`;
                  }}
                >
                  {conv.fromLabel} → {conv.toLabel}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
