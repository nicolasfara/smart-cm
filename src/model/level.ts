export enum Level {
    SHORT = "short",
    MEDIUM = "medium",
    LARGE = "large"
}

export function levelToInteger(level: Level): number {
    switch (level) {
        case Level.SHORT: return 1
        case Level.MEDIUM: return 2
        case Level.LARGE: return 3
    }
}