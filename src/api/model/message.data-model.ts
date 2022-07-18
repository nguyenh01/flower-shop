export interface Message {
  content: string;
  customer: string;
  sender: string;
  sent_time: string;
  updatedAt: string;
  wasRead: boolean;
  __v: number;
  _id: string;
}

export interface MessageResponse {
  message: Message[];
}
