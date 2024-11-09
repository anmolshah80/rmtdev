export type TJobItem = {
  id: number;
  badgeLetters: string;
  company: string;
  daysAgo: number;
  relevanceScore: number;
  title: string;
};

export type TJobItemExpanded = TJobItem & {
  description: string;
  qualifications: string[];
  reviews: Array<string>;
  duration: string;
  location: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
};
