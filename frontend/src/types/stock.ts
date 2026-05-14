export type StockData = {
    symbol: string;
    price: number;
    change: number;
    changePercent: string;
};

export type EventData = {
    type: string;
    strength?: string;
    signal?: string;
    changePercent: string;
} | null;

export type HistoryItem = {
    id: number;
    symbol: string;
    price: number;
    change: number;
    changePercent: string;
    eventType: string | null;
    explanation: string | null;
    createdAt: string;
};

export type NewsItem = {
    title: string;
    url: string;
};

export type StockResponse = {
    success: boolean;

    data: StockData;

    event: EventData;

    news: NewsItem[];

    explanation: string;
};

export type AIAnalysis = {
    summary: string;
    sentiment: string;
    confidence: number;
    risk: string;
    signal: string;
};