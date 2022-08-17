// const baseUrl = "http://localhost:3001/api";
const baseUrl = "https://imbue-proxy.herokuapp.com/api";

const apiUrls = {
    fetchViewerEvents: `${baseUrl}/viewer-events`,
    fetchCreatorEvents: `${baseUrl}/creator-events`,
    eventPurchased: `${baseUrl}/check-event-purchased`
}

export { apiUrls };
