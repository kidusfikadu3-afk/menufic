import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get ALL environment variables that start with IMAGEKIT
  const imagekitVars = Object.keys(process.env)
    .filter(key => key.includes('IMAGEKIT'))
    .reduce((obj, key) => {
      obj[key] = process.env[key] ? "DEFINED" : "UNDEFINED";
      return obj;
    }, {} as Record<string, string>);
  
  res.status(200).json(imagekitVars);
}