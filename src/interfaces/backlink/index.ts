import { IndividualInterface } from 'interfaces/individual';
import { GetQueryInterface } from 'interfaces';

export interface BacklinkInterface {
  id?: string;
  url: string;
  individual_id?: string;
  created_at?: any;
  updated_at?: any;

  individual?: IndividualInterface;
  _count?: {};
}

export interface BacklinkGetQueryInterface extends GetQueryInterface {
  id?: string;
  url?: string;
  individual_id?: string;
}
