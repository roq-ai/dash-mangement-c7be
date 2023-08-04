import { BacklinkInterface } from 'interfaces/backlink';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface IndividualInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  backlink?: BacklinkInterface[];
  user?: UserInterface;
  _count?: {
    backlink?: number;
  };
}

export interface IndividualGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
