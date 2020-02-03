import { Request, Response } from "express";
import axios from "axios";
import * as propublica from "../helpers/propublica";

export async function getMembers(request: Request, response: Response) {
  try {
    console.log(request.params.chamber, request.params.chamberNumber);
    const result = await axios.get(
      propublica.members(request.params.chamber, request.params.chamberNumber),
      propublica.headers
    );
    response.json({ data: result.data.results });
  } catch (err) {
    response.json({ err });
  }
}

export async function getMember(request: Request, response: Response) {
  try {
    const result = await axios.get(
      propublica.member(request.params.memberId),
      propublica.headers
    );
    response.json({ data: result.data.results });
  } catch (err) {
    response.json({ err });
  }
}

export async function getMemberVotes(request: Request, response: Response) {
  try {
    const result = await axios.get(
      propublica.memberVotes(request.params.memberId),
      propublica.headers
    );
    response.json({ data: result.data.results });
  } catch (err) {
    response.json({ err });
  }
}
