/**
 * BMI (Body Mass Index) calculation library for UmrechnerPro
 */

export interface BMIResult {
  bmi: number;
  category: BMICategory;
  categoryDe: string;
  healthRisk: string;
  idealWeightRange: { min: number; max: number };
  weightDifference: { toNormal: number; direction: 'lose' | 'gain' | 'normal' };
}

export type BMICategory = 'underweight_severe' | 'underweight_moderate' | 'underweight_mild' 
  | 'normal' | 'overweight_mild' | 'overweight_moderate' | 'obese_class1' 
  | 'obese_class2' | 'obese_class3';

/**
 * BMI categories according to WHO
 */
export const bmiCategories: Array<{
  category: BMICategory;
  nameDe: string;
  min: number;
  max: number;
  color: string;
  description: string;
}> = [
  { category: 'underweight_severe', nameDe: 'Starkes Untergewicht', min: 0, max: 16, color: '#FF6B6B', description: 'Ernsthafte medizinische Beratung empfohlen' },
  { category: 'underweight_moderate', nameDe: 'Mäßiges Untergewicht', min: 16, max: 17, color: '#FF9F43', description: 'Medizinische Beratung empfohlen' },
  { category: 'underweight_mild', nameDe: 'Leichtes Untergewicht', min: 17, max: 18.5, color: '#FECA57', description: 'Gesunde Gewichtszunahme erwägen' },
  { category: 'normal', nameDe: 'Normalgewicht', min: 18.5, max: 25, color: '#26DE81', description: 'Gesundes Gewicht – beibehalten!' },
  { category: 'overweight_mild', nameDe: 'Präadipositas', min: 25, max: 30, color: '#FECA57', description: 'Leichte Gewichtsreduktion empfohlen' },
  { category: 'overweight_moderate', nameDe: 'Adipositas Grad I', min: 30, max: 35, color: '#FF9F43', description: 'Gewichtsreduktion empfohlen' },
  { category: 'obese_class1', nameDe: 'Adipositas Grad I', min: 30, max: 35, color: '#FF9F43', description: 'Gewichtsreduktion wichtig' },
  { category: 'obese_class2', nameDe: 'Adipositas Grad II', min: 35, max: 40, color: '#FF6B6B', description: 'Medizinische Unterstützung empfohlen' },
  { category: 'obese_class3', nameDe: 'Adipositas Grad III', min: 40, max: 100, color: '#E74C3C', description: 'Dringend medizinische Behandlung empfohlen' },
];

/**
 * Calculate BMI
 * Formula: BMI = weight (kg) / height (m)²
 */
export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  
  // Find category
  let category: BMICategory = 'normal';
  let categoryDe = 'Normalgewicht';
  let healthRisk = 'Kein erhöhtes Risiko';
  
  for (const cat of bmiCategories) {
    if (bmi >= cat.min && bmi < cat.max) {
      category = cat.category;
      categoryDe = cat.nameDe;
      healthRisk = cat.description;
      break;
    }
  }
  
  // Calculate ideal weight range (BMI 18.5 - 25)
  const idealWeightRange = {
    min: 18.5 * heightM * heightM,
    max: 25 * heightM * heightM,
  };
  
  // Calculate weight difference to normal range
  let weightDifference: { toNormal: number; direction: 'lose' | 'gain' | 'normal' };
  
  if (bmi < 18.5) {
    weightDifference = {
      toNormal: idealWeightRange.min - weightKg,
      direction: 'gain',
    };
  } else if (bmi >= 25) {
    weightDifference = {
      toNormal: weightKg - idealWeightRange.max,
      direction: 'lose',
    };
  } else {
    weightDifference = {
      toNormal: 0,
      direction: 'normal',
    };
  }
  
  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    categoryDe,
    healthRisk,
    idealWeightRange,
    weightDifference,
  };
}

/**
 * Calculate BMI with imperial units
 */
export function calculateBMIImperial(weightLbs: number, heightFt: number, heightIn: number): BMIResult {
  const weightKg = weightLbs * 0.453592;
  const heightCm = (heightFt * 12 + heightIn) * 2.54;
  return calculateBMI(weightKg, heightCm);
}

/**
 * Get weight status description in German
 */
export function getBMIDescription(bmi: number): string {
  if (bmi < 16) return 'Starkes Untergewicht';
  if (bmi < 17) return 'Mäßiges Untergewicht';
  if (bmi < 18.5) return 'Leichtes Untergewicht';
  if (bmi < 25) return 'Normalgewicht';
  if (bmi < 30) return 'Übergewicht (Präadipositas)';
  if (bmi < 35) return 'Adipositas Grad I';
  if (bmi < 40) return 'Adipositas Grad II';
  return 'Adipositas Grad III';
}

/**
 * Calculate healthy weight range for a given height
 */
export function getHealthyWeightRange(heightCm: number): { min: number; max: number } {
  const heightM = heightCm / 100;
  return {
    min: Math.round(18.5 * heightM * heightM * 10) / 10,
    max: Math.round(25 * heightM * heightM * 10) / 10,
  };
}
