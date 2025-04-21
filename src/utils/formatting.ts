// Format a number of dollars into a more readable format (e.g. $1.2k, $5M)
export const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
        notation: "compact",
        compactDisplay: "short"
    }).format(amount);
};

// Format a number of votes into a more readable format (e.g., 1.2k, 1.5M)
export const formatVotes = (votes: number): string => {
    if (votes >= 1000000) {
        return `${(votes / 1000000).toFixed(1)}M`;
    } else if (votes >= 1000) {
        return `${(votes / 1000).toFixed(1)}K`;
    }
    return votes.toString();
};

// Format a runtime in minutes into a more readable format (e.g., 1h 30m)
export const formatRuntime = (minutes: number): string => {
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

// format a data string into a more readable format (e.g., january 1, 2023)
export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
};