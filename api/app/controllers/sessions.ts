import { Request, Response } from 'express';
import axios from 'axios';
import * as propublica from '../helpers/propublica';

export async function getSession(request: Request, response: Response) {
  console.log(request.params);
  try {  
    const result = await axios.get(propublica.session(request.params.session, request.params.rollCall), propublica.headers);
    response.json({ data: result.data.results })
  } catch(err) {
    response.json({err});
  }
}
