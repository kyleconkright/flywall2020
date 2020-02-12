import { Request, Response } from "express";
import axios from "axios";
import * as propublica from "../helpers/propublica";

// https://api.propublica.org/congress/v1/bills/search.json?query={query}
export async function searchBills(
  request: Request<{ query: string }>,
  response: Response
) {
  try {
    const {
      body: { query }
    } = request;

    const result = await axios.get(
      propublica.createSearchBills(query),
      propublica.headers
    );
    response.json({ data: result.data.results });
  } catch (err) {
    response.json({ err });
  }
}
