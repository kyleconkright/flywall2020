import { Request, Response } from "express";
import axios from "axios";
import * as propublica from "../helpers/propublica";

export async function getMembers(request: Request, response: Response) {
  try {
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

export async function getCompareMembers(request: Request, response: Response) {
  try {
    const { member1, member2, chamber, congressNumber } = request.params;
    if (!member1 || !member2) {
      throw new Error("Missing Two members to compare");
    }
    if (!congressNumber || !chamber) {
      throw new Error("Missing a chamber or congress number");
    }
    const res = await axios.get(
      propublica.compareMembers(member1, member2, congressNumber, chamber),
      propublica.headers
    );
    response.json({ data: res.data.results[0] });
  } catch (err) {
    console.log("err >> ", err);
    response.json({ err });
  }
}
