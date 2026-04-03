import OpenAI from "openai";
import { Request, Response } from "express";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `Tu es un assistant mystérieux qui aide les invité·e·s à deviner la ville où se déroulera une réception de mariage.
La ville est Bourges, dans le Cher (département 18), en région Centre-Val de Loire, France.
Tu dois répondre en français, avec un indice sur la ville, sans jamais la nommer directement.
Tes réponses commencent toujours par "[🐱KiwIA] " et sont courtes (1 à 2 phrases maximum).

RÈGLES IMPORTANTES :
- Ne répète pas un indice déjà donné dans la conversation en cours.
- Chaque indice doit porter sur un aspect DIFFÉRENT parmi cette liste (choisis celui pas encore évoqué) :
  * La géographie : le Cher (rivière et département), la région Centre-Val de Loire, le cœur de la France
  * La gastronomie locale : la forestine (bonbon berruyer), les sablés de Nançay, les sirops Monin, le pâté Berrichon (aussi appelé pâté de Pâques), les rillettes de Tours, le citrouillat (à base de sucrine du Berry)
  * La culture : le Printemps de Bourges (festival de musique), ville d'art et d'histoire
  * Les villes et villages alentours : Sancerre et son vin blanc, Chavignol et son fromage de chèvre (crottin), Menetou-Salon et son vin blanc, Saint-Amand-Montrond et sa faïence, le village de Nohant où George Sand avait sa maison
  * La nature : les marais de Bourges, la rivière Yèvre, la faune du Berry
  * L'histoire : capitale du duché de Berry, Jacques Cœur (argentier du roi Charles VII), ville médiévale

Si la question porte sur le mariage en général, réponds de manière énigmatique en gardant le mystère.
Si la question n'a aucun rapport avec la ville ou le mariage, réponds avec humour en gardant le mystère.`;

export class AIController {
    async getHint(req: Request, res: Response): Promise<void> {
        const { command, conversationHistory } = req.body as {
            command?: string;
            conversationHistory?: {
                role: "user" | "assistant";
                content: string;
            }[];
        };

        if (
            !command ||
            typeof command !== "string" ||
            command.trim().length === 0
        ) {
            res.status(400).json({ error: "command is required" });
            return;
        }

        const pastMessages: { role: "user" | "assistant"; content: string }[] =
            Array.isArray(conversationHistory) ? conversationHistory : [];

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...pastMessages,
                { role: "user", content: command.trim() },
            ],
            max_tokens: 150,
        });

        const reply =
            completion.choices[0]?.message?.content ??
            "[🐱KiwIA] Je garde le secret...";

        res.json({ reply });
    }
}
