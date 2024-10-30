import { config as dotConfig } from "dotenv";

dotConfig();

export const config = {
    database: {
        dbDSN: process.env.DB_DSN ?? "",
        chatDBName: process.env.CHAT_DB_NAME ?? "",
        embeddedNicheDataCollection: "embedded_niche_data"

    },
    serviceEndpoints: {
        creditHiveServiceUrl: process.env.CSQ_API_URL ?? ""
    },
    openAI: {
        COMPLETION_MODEL: { TYPE: "CHAT", URL: "https://api.openai.com/v1/chat/completions", MODEL: "gpt-3.5-turbo" }, //chat models e.g gtp3.5-turbo
        EMBEDDING_URL: "https://api.openai.com/v1/embeddings",
        EMBEDDING_MODEL: "text-embedding-ada-002",
        GPT4_COMPLETION_MODEL: { TYPE: "CHAT", URL: "https://api.openai.com/v1/chat/completions", MODEL: "gpt-3.5-turbo" },
        MAX_PROMPT_TOKEN_SIZE: 4000
    }
};
