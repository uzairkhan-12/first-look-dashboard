export interface IPORecord {
  name: string;
  year: number;
  ticker: string;
  sector: string;
  listingDate: string;
  offerPrice: number;
  totalOfferShares: number;
  totalOfferSize: number;
  retailTrancheShares: number;
  retailAllocationPercent: number;
  retailCoverageMultiple: number;
  retailSubscriberCount: number | null;
  institutionalCoverageMultiple: number;
  institutionalDemand: number;
  ipoSizeBucket: string;
}

export const ipoData: IPORecord[] = [
  { name: "Derayah Financial", year: 2025, ticker: "4084", sector: "Financial services", listingDate: "3/10/25", offerPrice: 30, totalOfferShares: 49.95, totalOfferSize: 1498.41, retailTrancheShares: 4.99, retailAllocationPercent: 10, retailCoverageMultiple: 15, retailSubscriberCount: 586422, institutionalCoverageMultiple: 162, ipoSizeBucket: "1,000-1,999m" },
  { name: "Entaj", year: 2025, ticker: "2287", sector: "Food & Poultry", listingDate: "3/17/25", offerPrice: 50, totalOfferShares: 9, totalOfferSize: 450, retailTrancheShares: 0.9, retailAllocationPercent: 10, retailCoverageMultiple: 30, retailSubscriberCount: null, institutionalCoverageMultiple: 208, ipoSizeBucket: "<500m" },
  { name: "Masar", year: 2025, ticker: "4325", sector: "Real Estate", listingDate: "3/24/25", offerPrice: 15, totalOfferShares: 130.79, totalOfferSize: 1961.79, retailTrancheShares: 13.08, retailAllocationPercent: 10, retailCoverageMultiple: 20, retailSubscriberCount: 1048530, institutionalCoverageMultiple: 241, ipoSizeBucket: "1,000-1,999m" },
  { name: "UCIC", year: 2025, ticker: "1323", sector: "Materials", listingDate: "5/27/25", offerPrice: 50, totalOfferShares: 12, totalOfferSize: 600, retailTrancheShares: 2.4, retailAllocationPercent: 20, retailCoverageMultiple: 8.91, retailSubscriberCount: 396601, institutionalCoverageMultiple: 126, ipoSizeBucket: "500-999m" },
  { name: "FlyNas", year: 2025, ticker: "4264", sector: "Transportation", listingDate: "6/18/25", offerPrice: 80, totalOfferShares: 51.26, totalOfferSize: 4100.45, retailTrancheShares: 10.25, retailAllocationPercent: 20, retailCoverageMultiple: 3.5, retailSubscriberCount: 666069, institutionalCoverageMultiple: 100, ipoSizeBucket: "2,000-4,999m" },
  { name: "SMC", year: 2025, ticker: "4019", sector: "Healthcare Equipment & Services", listingDate: "6/25/25", offerPrice: 25, totalOfferShares: 75, totalOfferSize: 1875, retailTrancheShares: 15, retailAllocationPercent: 20, retailCoverageMultiple: 1.45, retailSubscriberCount: 317820, institutionalCoverageMultiple: 64.7, ipoSizeBucket: "1,000-1,999m" },
  { name: "SSC", year: 2025, ticker: "6018", sector: "Consumer services", listingDate: "7/22/25", offerPrice: 7.5, totalOfferShares: 34.32, totalOfferSize: 257.4, retailTrancheShares: 6.84, retailAllocationPercent: 20, retailCoverageMultiple: 5.3, retailSubscriberCount: 259687, institutionalCoverageMultiple: 44.1, ipoSizeBucket: "<500m" },
  { name: "Marketing Home", year: 2025, ticker: "4194", sector: "Consumer Discretionary", listingDate: "9/2/25", offerPrice: 85, totalOfferShares: 4.8, totalOfferSize: 408, retailTrancheShares: 0.96, retailAllocationPercent: 20, retailCoverageMultiple: 2, retailSubscriberCount: 77444, institutionalCoverageMultiple: 9.67, ipoSizeBucket: "<500m" },
  { name: "Al Majdiah", year: 2025, ticker: "4326", sector: "Real Estate", listingDate: "9/10/25", offerPrice: 14, totalOfferShares: 90, totalOfferSize: 1260, retailTrancheShares: 18, retailAllocationPercent: 20, retailCoverageMultiple: 2.78, retailSubscriberCount: null, institutionalCoverageMultiple: 107, ipoSizeBucket: "1,000-1,999m" },
  { name: "Cherry", year: 2025, ticker: "4265", sector: "Transportation", listingDate: "12/1/25", offerPrice: 28, totalOfferShares: 9, totalOfferSize: 252, retailTrancheShares: 1.8, retailAllocationPercent: 20, retailCoverageMultiple: 6.47, retailSubscriberCount: null, institutionalCoverageMultiple: 85.6, ipoSizeBucket: "<500m" },
  { name: "Al Masar Al Shamil", year: 2025, ticker: "6019", sector: "Consumer services", listingDate: "12/1/25", offerPrice: 19.5, totalOfferShares: 30.72, totalOfferSize: 599.05, retailTrancheShares: 9.21, retailAllocationPercent: 30, retailCoverageMultiple: 1.21, retailSubscriberCount: 95700, institutionalCoverageMultiple: 102.9, ipoSizeBucket: "500-999m" },
  { name: "CGS", year: 2025, ticker: "4147", sector: "Capital Goods", listingDate: "12/9/25", offerPrice: 10, totalOfferShares: 30, totalOfferSize: 300, retailTrancheShares: 6, retailAllocationPercent: 20, retailCoverageMultiple: 0.71, retailSubscriberCount: 78824, institutionalCoverageMultiple: 61.6, ipoSizeBucket: "<500m" },
  { name: "Al Ramz", year: 2025, ticker: "4327", sector: "Real Estate", listingDate: "12/18/25", offerPrice: 70, totalOfferShares: 12.86, totalOfferSize: 900.2, retailTrancheShares: 2.57, retailAllocationPercent: 20, retailCoverageMultiple: 0.36, retailSubscriberCount: null, institutionalCoverageMultiple: 11.1, ipoSizeBucket: "500-999m" },
  { name: "MBC", year: 2024, ticker: "4072", sector: "Media and Entertainment", listingDate: "1/8/24", offerPrice: 25, totalOfferShares: 33.25, totalOfferSize: 831, retailTrancheShares: 3.3, retailAllocationPercent: 10, retailCoverageMultiple: 17.6, retailSubscriberCount: 359460, institutionalCoverageMultiple: 66, ipoSizeBucket: "500-999m" },
  { name: "Avalon Pharma", year: 2024, ticker: "4016", sector: "Pharma & Life Science", listingDate: "2/27/24", offerPrice: 82, totalOfferShares: 6, totalOfferSize: 492, retailTrancheShares: 0.6, retailAllocationPercent: 10, retailCoverageMultiple: 54.3, retailSubscriberCount: 807500, institutionalCoverageMultiple: 138.7, ipoSizeBucket: "<500m" },
  { name: "Modern Mills", year: 2024, ticker: "2284", sector: "Food & Beverages", listingDate: "3/27/24", offerPrice: 48, totalOfferShares: 24.55, totalOfferSize: 1180, retailTrancheShares: 2.45, retailAllocationPercent: 10, retailCoverageMultiple: 21.9, retailSubscriberCount: 966710, institutionalCoverageMultiple: 127, ipoSizeBucket: "1,000-1,999m" },
  { name: "Fakeeh Care", year: 2024, ticker: "4017", sector: "Healthcare Equipment & Services", listingDate: "6/5/24", offerPrice: 57.5, totalOfferShares: 49.8, totalOfferSize: 2900, retailTrancheShares: 4.98, retailAllocationPercent: 10, retailCoverageMultiple: 14.5, retailSubscriberCount: 1340000, institutionalCoverageMultiple: 119, ipoSizeBucket: "2,000-4,999m" },
  { name: "Miahona", year: 2024, ticker: "2084", sector: "Utilities", listingDate: "6/6/24", offerPrice: 11.5, totalOfferShares: 48.27, totalOfferSize: 555.2, retailTrancheShares: 9.65, retailAllocationPercent: 20, retailCoverageMultiple: 6.1, retailSubscriberCount: null, institutionalCoverageMultiple: 170, ipoSizeBucket: "500-999m" },
  { name: "SMASCO HR", year: 2024, ticker: "1834", sector: "Commercial & Prof Services", listingDate: "6/12/24", offerPrice: 7.5, totalOfferShares: 120, totalOfferSize: 900, retailTrancheShares: 12, retailAllocationPercent: 10, retailCoverageMultiple: 13, retailSubscriberCount: 1070000, institutionalCoverageMultiple: 128, ipoSizeBucket: "500-999m" },
  { name: "TALCO Industrial", year: 2024, ticker: "4143", sector: "Materials", listingDate: "6/13/24", offerPrice: 43, totalOfferShares: 12, totalOfferSize: 516, retailTrancheShares: 1.2, retailAllocationPercent: 10, retailCoverageMultiple: 17.4, retailSubscriberCount: null, institutionalCoverageMultiple: 68.5, ipoSizeBucket: "500-999m" },
  { name: "Rasan", year: 2024, ticker: "8313", sector: "Insurance / Fintech", listingDate: "6/13/24", offerPrice: 37, totalOfferShares: 22.74, totalOfferSize: 841.38, retailTrancheShares: 2.274, retailAllocationPercent: 10, retailCoverageMultiple: 12.8, retailSubscriberCount: null, institutionalCoverageMultiple: 129.1, ipoSizeBucket: "500-999m" },
  { name: "Al Majed Oud", year: 2024, ticker: "4165", sector: "Household & Personal Products", listingDate: "10/7/24", offerPrice: 94, totalOfferShares: 7.5, totalOfferSize: 705, retailTrancheShares: 1.5, retailAllocationPercent: 20, retailCoverageMultiple: 8, retailSubscriberCount: null, institutionalCoverageMultiple: 15.6, ipoSizeBucket: "500-999m" },
  { name: "Arabian Mills", year: 2024, ticker: "2285", sector: "Food & Beverages", listingDate: "10/8/24", offerPrice: 66, totalOfferShares: 15.39, totalOfferSize: 1016, retailTrancheShares: 1.53, retailAllocationPercent: 10, retailCoverageMultiple: 9.2, retailSubscriberCount: null, institutionalCoverageMultiple: 132, ipoSizeBucket: "1,000-1,999m" },
  { name: "Fourth Mills", year: 2024, ticker: "2286", sector: "Food & Beverages", listingDate: "10/29/24", offerPrice: 5.3, totalOfferShares: 162, totalOfferSize: 858.6, retailTrancheShares: 32.4, retailAllocationPercent: 20, retailCoverageMultiple: 3.94, retailSubscriberCount: null, institutionalCoverageMultiple: 119, ipoSizeBucket: "500-999m" },
  { name: "Tamkeen HR", year: 2024, ticker: "1835", sector: "Commercial & Prof Services", listingDate: "11/27/24", offerPrice: 50, totalOfferShares: 7.95, totalOfferSize: 397.5, retailTrancheShares: 1.59, retailAllocationPercent: 20, retailCoverageMultiple: 14.43, retailSubscriberCount: 389012, institutionalCoverageMultiple: 138.2, ipoSizeBucket: "<500m" },
  { name: "Tasheel", year: 2024, ticker: "4083", sector: "Financial services", listingDate: "12/3/24", offerPrice: 132, totalOfferShares: 7.5, totalOfferSize: 990, retailTrancheShares: 0.75, retailAllocationPercent: 10, retailCoverageMultiple: 9.1, retailSubscriberCount: null, institutionalCoverageMultiple: 132, ipoSizeBucket: "500-999m" },
];

export interface IPOPerformance {
  name: string;
  year: number;
  ticker: string;
  listingDate: string;
  priceAtListing: number;
  priceAt3M: number | null;
  priceAt6M: number | null;
  priceAt9M: number | null;
  return3M: number | null;
  return6M: number | null;
  return9M: number | null;
  tasiReturn3M: number | null;
  tasiReturn6M: number | null;
  tasiReturn9M: number | null;
  abnormalReturn3M: number | null;
  abnormalReturn6M: number | null;
  abnormalReturn9M: number | null;
  belowIssue3M: boolean | null;
  belowIssue6M: boolean | null;
  belowIssue9M: boolean | null;
}

export const ipoPerformance: IPOPerformance[] = [
  { name: "Derayah Financial", year: 2025, ticker: "4084", listingDate: "3/10/25", priceAtListing: 30, priceAt3M: 26, priceAt6M: 24.64, priceAt9M: 29, return3M: -13, return6M: -18, return9M: -3, tasiReturn3M: -6, tasiReturn6M: -11, tasiReturn9M: -9, abnormalReturn3M: -7, abnormalReturn6M: -7, abnormalReturn9M: 5, belowIssue3M: true, belowIssue6M: true, belowIssue9M: true },
  { name: "Entaj", year: 2025, ticker: "2287", listingDate: "3/17/25", priceAtListing: 50, priceAt3M: 40.5, priceAt6M: 37.66, priceAt9M: 33.3, return3M: -19, return6M: -25, return9M: -33, tasiReturn3M: -10, tasiReturn6M: -10, tasiReturn9M: -12, abnormalReturn3M: -9, abnormalReturn6M: -14, abnormalReturn9M: -21, belowIssue3M: true, belowIssue6M: true, belowIssue9M: true },
  { name: "Masar", year: 2025, ticker: "4325", listingDate: "3/24/25", priceAtListing: 15, priceAt3M: 23.76, priceAt6M: 23.5, priceAt9M: 18.22, return3M: 58, return6M: 57, return9M: 21, tasiReturn3M: -7, tasiReturn6M: -3, tasiReturn9M: -11, abnormalReturn3M: 65, abnormalReturn6M: 60, abnormalReturn9M: 32, belowIssue3M: false, belowIssue6M: false, belowIssue9M: false },
  { name: "UCIC", year: 2025, ticker: "1323", listingDate: "5/27/25", priceAtListing: 50, priceAt3M: 30.74, priceAt6M: 28.32, priceAt9M: 25.34, return3M: -39, return6M: -43, return9M: -49, tasiReturn3M: -1, tasiReturn6M: -3, tasiReturn9M: 3, abnormalReturn3M: -37, abnormalReturn6M: -41, abnormalReturn9M: -52, belowIssue3M: true, belowIssue6M: true, belowIssue9M: true },
  { name: "FlyNas", year: 2025, ticker: "4264", listingDate: "6/18/25", priceAtListing: 80, priceAt3M: 78.2, priceAt6M: 70, priceAt9M: 61.25, return3M: -2, return6M: -12, return9M: -23, tasiReturn3M: 2, tasiReturn6M: -1, tasiReturn9M: 6, abnormalReturn3M: -4, abnormalReturn6M: -11, abnormalReturn9M: -29, belowIssue3M: true, belowIssue6M: true, belowIssue9M: true },
  { name: "SMC", year: 2025, ticker: "4019", listingDate: "6/25/25", priceAtListing: 25, priceAt3M: 19.41, priceAt6M: 19.03, priceAt9M: 20.44, return3M: -22, return6M: -24, return9M: -18, tasiReturn3M: 3, tasiReturn6M: -4, tasiReturn9M: 2, abnormalReturn3M: -25, abnormalReturn6M: -20, abnormalReturn9M: -21, belowIssue3M: true, belowIssue6M: true, belowIssue9M: true },
  { name: "SSC", year: 2025, ticker: "6018", listingDate: "7/22/25", priceAtListing: 7.5, priceAt3M: 10.27, priceAt6M: 8.53, priceAt9M: null, return3M: 37, return6M: 14, return9M: null, tasiReturn3M: 7, tasiReturn6M: 3, tasiReturn9M: null, abnormalReturn3M: 30, abnormalReturn6M: 11, abnormalReturn9M: null, belowIssue3M: false, belowIssue6M: false, belowIssue9M: null },
  { name: "Marketing Home", year: 2025, ticker: "4194", listingDate: "9/2/25", priceAtListing: 85, priceAt3M: 57.1, priceAt6M: null, priceAt9M: null, return3M: -33, return6M: null, return9M: null, tasiReturn3M: -1, tasiReturn6M: null, tasiReturn9M: null, abnormalReturn3M: -32, abnormalReturn6M: null, abnormalReturn9M: null, belowIssue3M: true, belowIssue6M: null, belowIssue9M: null },
  { name: "Al Majdiah", year: 2025, ticker: "4326", listingDate: "9/10/25", priceAtListing: 14, priceAt3M: 10.51, priceAt6M: null, priceAt9M: null, return3M: -25, return6M: null, return9M: null, tasiReturn3M: 2, tasiReturn6M: null, tasiReturn9M: null, abnormalReturn3M: -27, abnormalReturn6M: null, abnormalReturn9M: null, belowIssue3M: true, belowIssue6M: null, belowIssue9M: null },
  { name: "Cherry", year: 2025, ticker: "4265", listingDate: "12/1/25", priceAtListing: 28, priceAt3M: 28.62, priceAt6M: null, priceAt9M: null, return3M: 2, return6M: null, return9M: null, tasiReturn3M: 7, tasiReturn6M: null, tasiReturn9M: null, abnormalReturn3M: -4, abnormalReturn6M: null, abnormalReturn9M: null, belowIssue3M: false, belowIssue6M: null, belowIssue9M: null },
  { name: "Al Masar Al Shamil", year: 2025, ticker: "6019", listingDate: "12/1/25", priceAtListing: 19.5, priceAt3M: 23.28, priceAt6M: null, priceAt9M: null, return3M: 19, return6M: null, return9M: null, tasiReturn3M: 7, tasiReturn6M: null, tasiReturn9M: null, abnormalReturn3M: 13, abnormalReturn6M: null, abnormalReturn9M: null, belowIssue3M: false, belowIssue6M: null, belowIssue9M: null },
  { name: "CGS", year: 2025, ticker: "4147", listingDate: "12/9/25", priceAtListing: 10, priceAt3M: 8.22, priceAt6M: null, priceAt9M: null, return3M: -18, return6M: null, return9M: null, tasiReturn3M: 5, tasiReturn6M: null, tasiReturn9M: null, abnormalReturn3M: -23, abnormalReturn6M: null, abnormalReturn9M: null, belowIssue3M: true, belowIssue6M: null, belowIssue9M: null },
  { name: "Al Ramz", year: 2025, ticker: "4327", listingDate: "12/18/25", priceAtListing: 70, priceAt3M: 63, priceAt6M: null, priceAt9M: null, return3M: -10, return6M: null, return9M: null, tasiReturn3M: 7, tasiReturn6M: null, tasiReturn9M: null, abnormalReturn3M: -17, abnormalReturn6M: null, abnormalReturn9M: null, belowIssue3M: true, belowIssue6M: null, belowIssue9M: null },
  { name: "MBC", year: 2024, ticker: "4072", listingDate: "1/8/24", priceAtListing: 25, priceAt3M: 56, priceAt6M: 42.3, priceAt9M: 43.55, return3M: 124, return6M: 69, return9M: 74, tasiReturn3M: 4, tasiReturn6M: -4, tasiReturn9M: -2, abnormalReturn3M: 120, abnormalReturn6M: 74, abnormalReturn9M: 76, belowIssue3M: false, belowIssue6M: false, belowIssue9M: false },
  { name: "Avalon Pharma", year: 2024, ticker: "4016", listingDate: "2/27/24", priceAtListing: 82, priceAt3M: 134.2, priceAt6M: 136.2, priceAt9M: 119.4, return3M: 64, return6M: 66, return9M: 46, tasiReturn3M: -6, tasiReturn6M: -3, tasiReturn9M: -8, abnormalReturn3M: 70, abnormalReturn6M: 69, abnormalReturn9M: 54, belowIssue3M: false, belowIssue6M: false, belowIssue9M: false },
  { name: "Modern Mills", year: 2024, ticker: "2284", listingDate: "3/27/24", priceAtListing: 48, priceAt3M: 45.45, priceAt6M: 49.3, priceAt9M: 40.8, return3M: -5, return6M: 3, return9M: -15, tasiReturn3M: -7, tasiReturn6M: -2, tasiReturn9M: -6, abnormalReturn3M: 2, abnormalReturn6M: 5, abnormalReturn9M: -9, belowIssue3M: true, belowIssue6M: false, belowIssue9M: true },
  { name: "Fakeeh Care", year: 2024, ticker: "4017", listingDate: "6/5/24", priceAtListing: 57.5, priceAt3M: 57.8, priceAt6M: 70.9, priceAt9M: 54, return3M: 1, return6M: 23, return9M: -6, tasiReturn3M: 5, tasiReturn6M: 3, tasiReturn9M: 3, abnormalReturn3M: -4, abnormalReturn6M: 20, abnormalReturn9M: -9, belowIssue3M: false, belowIssue6M: false, belowIssue9M: true },
  { name: "Miahona", year: 2024, ticker: "2084", listingDate: "6/6/24", priceAtListing: 11.5, priceAt3M: 31.05, priceAt6M: 28, priceAt9M: 21.9, return3M: 170, return6M: 143, return9M: 90, tasiReturn3M: 5, tasiReturn6M: 3, tasiReturn9M: 2, abnormalReturn3M: 165, abnormalReturn6M: 140, abnormalReturn9M: 88, belowIssue3M: false, belowIssue6M: false, belowIssue9M: false },
  { name: "SMASCO HR", year: 2024, ticker: "1834", listingDate: "6/12/24", priceAtListing: 7.5, priceAt3M: 8.91, priceAt6M: 7.69, priceAt9M: 6.61, return3M: 19, return6M: 3, return9M: -12, tasiReturn3M: 2, tasiReturn6M: 4, tasiReturn9M: 0, abnormalReturn3M: 17, abnormalReturn6M: -1, abnormalReturn9M: -12, belowIssue3M: false, belowIssue6M: false, belowIssue9M: true },
  { name: "TALCO Industrial", year: 2024, ticker: "4143", listingDate: "6/13/24", priceAtListing: 43, priceAt3M: 57.6, priceAt6M: 56, priceAt9M: 48.7, return3M: 34, return6M: 30, return9M: 13, tasiReturn3M: 3, tasiReturn6M: 5, tasiReturn9M: 2, abnormalReturn3M: 31, abnormalReturn6M: 25, abnormalReturn9M: 11, belowIssue3M: false, belowIssue6M: false, belowIssue9M: false },
  { name: "Rasan", year: 2024, ticker: "8313", listingDate: "6/13/24", priceAtListing: 37, priceAt3M: 56.04, priceAt6M: 71.11, priceAt9M: 79, return3M: 51, return6M: 92, return9M: 114, tasiReturn3M: 3, tasiReturn6M: 5, tasiReturn9M: 2, abnormalReturn3M: 48, abnormalReturn6M: 87, abnormalReturn9M: 112, belowIssue3M: false, belowIssue6M: false, belowIssue9M: false },
  { name: "Al Majed Oud", year: 2024, ticker: "4165", listingDate: "10/7/24", priceAtListing: 94, priceAt3M: 162, priceAt6M: 126.8, priceAt9M: 149.8, return3M: 72, return6M: 35, return9M: 59, tasiReturn3M: 2, tasiReturn6M: -6, tasiReturn9M: -5, abnormalReturn3M: 71, abnormalReturn6M: 41, abnormalReturn9M: 64, belowIssue3M: false, belowIssue6M: false, belowIssue9M: false },
  { name: "Arabian Mills", year: 2024, ticker: "2285", listingDate: "10/8/24", priceAtListing: 66, priceAt3M: 49.7, priceAt6M: 45.25, priceAt9M: 45.88, return3M: -25, return6M: -31, return9M: -30, tasiReturn3M: 1, tasiReturn6M: -6, tasiReturn9M: -6, abnormalReturn3M: -25, abnormalReturn6M: -25, abnormalReturn9M: -24, belowIssue3M: true, belowIssue6M: true, belowIssue9M: true },
  { name: "Fourth Mills", year: 2024, ticker: "2286", listingDate: "10/29/24", priceAtListing: 5.3, priceAt3M: 4.14, priceAt6M: 3.96, priceAt9M: 4.02, return3M: -22, return6M: -25, return9M: -24, tasiReturn3M: 3, tasiReturn6M: -3, tasiReturn9M: -10, abnormalReturn3M: -25, abnormalReturn6M: -23, abnormalReturn9M: -14, belowIssue3M: true, belowIssue6M: true, belowIssue9M: true },
  { name: "Tamkeen HR", year: 2024, ticker: "1835", listingDate: "11/27/24", priceAtListing: 50, priceAt3M: 57.6, priceAt6M: 52.9, priceAt9M: 55.7, return3M: 15, return6M: 6, return9M: 11, tasiReturn3M: 4, tasiReturn6M: -6, tasiReturn9M: -7, abnormalReturn3M: 11, abnormalReturn6M: 12, abnormalReturn9M: 18, belowIssue3M: false, belowIssue6M: false, belowIssue9M: false },
  { name: "Tasheel", year: 2024, ticker: "4083", listingDate: "12/3/24", priceAtListing: 132, priceAt3M: 168.4, priceAt6M: 167, priceAt9M: 148.5, return3M: 28, return6M: 27, return9M: 13, tasiReturn3M: 3, tasiReturn6M: -8, tasiReturn9M: -10, abnormalReturn3M: 25, abnormalReturn6M: 35, abnormalReturn9M: 23, belowIssue3M: false, belowIssue6M: false, belowIssue9M: false },
];

export interface SummaryStats {
  horizon: string;
  listingYear: number;
  ipoCountTotal: number;
  ipoCountWithData: number;
  medianIPOReturn: number;
  medianTASIReturn: number;
  medianAbnormalReturn: number;
  underperformRate: number;
}

export const summaryStats: SummaryStats[] = [
  { horizon: "3M", listingYear: 2024, ipoCountTotal: 13, ipoCountWithData: 13, medianIPOReturn: 28, medianTASIReturn: 3, medianAbnormalReturn: 25, underperformRate: 23 },
  { horizon: "6M", listingYear: 2024, ipoCountTotal: 13, ipoCountWithData: 13, medianIPOReturn: 27, medianTASIReturn: -3, medianAbnormalReturn: 25, underperformRate: 23 },
  { horizon: "9M", listingYear: 2024, ipoCountTotal: 13, ipoCountWithData: 13, medianIPOReturn: 13, medianTASIReturn: -5, medianAbnormalReturn: 18, underperformRate: 38 },
  { horizon: "3M", listingYear: 2025, ipoCountTotal: 13, ipoCountWithData: 13, medianIPOReturn: -13, medianTASIReturn: 2, medianAbnormalReturn: -9, underperformRate: 77 },
  { horizon: "6M", listingYear: 2025, ipoCountTotal: 13, ipoCountWithData: 7, medianIPOReturn: -18, medianTASIReturn: 3, medianAbnormalReturn: -11, underperformRate: 71 },
  { horizon: "9M", listingYear: 2025, ipoCountTotal: 13, ipoCountWithData: 6, medianIPOReturn: -21, medianTASIReturn: 5, medianAbnormalReturn: -21, underperformRate: 67 },
];
