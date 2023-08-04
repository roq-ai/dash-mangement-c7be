import axios from 'axios';
import queryString from 'query-string';
import { BacklinkInterface, BacklinkGetQueryInterface } from 'interfaces/backlink';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBacklinks = async (
  query?: BacklinkGetQueryInterface,
): Promise<PaginatedInterface<BacklinkInterface>> => {
  const response = await axios.get('/api/backlinks', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBacklink = async (backlink: BacklinkInterface) => {
  const response = await axios.post('/api/backlinks', backlink);
  return response.data;
};

export const updateBacklinkById = async (id: string, backlink: BacklinkInterface) => {
  const response = await axios.put(`/api/backlinks/${id}`, backlink);
  return response.data;
};

export const getBacklinkById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/backlinks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBacklinkById = async (id: string) => {
  const response = await axios.delete(`/api/backlinks/${id}`);
  return response.data;
};
