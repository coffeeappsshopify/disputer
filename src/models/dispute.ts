export interface Dispute {
  id: number;
  user_1: BigInt;
  user_2: BigInt;
  text_1: string;
  text_1_confirm: boolean;
  text_2: string;
  text_2_confirm: boolean;
  decision: string;
  who_is_right: string;
  summary: string;
}
