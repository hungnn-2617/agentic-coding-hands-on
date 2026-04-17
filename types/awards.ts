export interface PrizeValue {
  amount: string;
  label: string;
  labelEn?: string;
}

export interface AwardCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  descriptionEn?: string;
  thumbnailUrl: string;
  displayOrder: number;
  fullDescription: string;
  fullDescriptionEn?: string;
  imageUrl: string;
  prizeCount: number;
  prizeUnit: string;
  prizeUnitEn?: string;
  prizeValues: PrizeValue[];
}
