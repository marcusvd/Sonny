import { SocialNetworkDto } from "./social-network-dto";

export class ContactDto {
  id: number;
  email: string;
  site: string;
  cel: string;
  zap: string;
  landline: string;
  socialnetworks: SocialNetworkDto[];
}
