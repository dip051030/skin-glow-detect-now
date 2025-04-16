
/**
 * Simple image processor module for skin disease detection
 * Note: This is a simplified version for demonstration purposes
 */

// Mock detection results for demonstration
const DETECTION_RESULTS = [
  {
    name: "Acne",
    confidence: 0.89,
    description: "Inflammatory condition of the skin characterized by pimples, especially on the face",
    severity: "Mild",
    recommendation: "Consider using benzoyl peroxide or salicylic acid products"
  },
  {
    name: "Eczema",
    confidence: 0.75,
    description: "Condition where patches of skin become inflamed, itchy, cracked, and rough",
    severity: "Moderate",
    recommendation: "Apply moisturizers regularly and avoid irritants"
  },
  {
    name: "Rosacea",
    confidence: 0.65,
    description: "Condition that causes redness and visible blood vessels in your face",
    severity: "Mild",
    recommendation: "Avoid triggers such as spicy food and extreme temperatures"
  },
  {
    name: "Psoriasis",
    confidence: 0.42,
    description: "Condition that causes red, flaky, crusty patches of skin covered with silvery scales",
    severity: "Severe",
    recommendation: "Consult a dermatologist for prescription treatment"
  }
];

export interface DetectionResult {
  name: string;
  confidence: number;
  description: string;
  severity: string;
  recommendation: string;
}

/**
 * Process the image and return mock detection results
 * In a real application, this would use a ML model for actual detection
 */
export const processImage = async (imageFile: File): Promise<DetectionResult> => {
  // Simulate processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, return a random result
      const randomIndex = Math.floor(Math.random() * DETECTION_RESULTS.length);
      resolve(DETECTION_RESULTS[randomIndex]);
    }, 2000); // 2 second delay to simulate processing
  });
};

/**
 * Create a preview URL for the uploaded image
 */
export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Clean up the created object URL to prevent memory leaks
 */
export const revokeImagePreview = (previewUrl: string): void => {
  URL.revokeObjectURL(previewUrl);
};
