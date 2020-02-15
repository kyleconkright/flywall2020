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

export async function singleBill(request: Request, response: Response) {
  try {
    const {
      body: { congress, billId }
    } = request;

    const result = await axios.get(
      propublica.getSingleBill(billId, congress),
      propublica.headers
    );
    if (result.data.status === "ERROR") {
      response.json({
        err: Array.isArray(response.data.errors)
          ? response.data.errors.map(e => e.message).join(" - ")
          : response.data.errors
      });
    }
    response.json({ data: result.data.results });
  } catch (err) {
    response.json({ err });
  }
}
