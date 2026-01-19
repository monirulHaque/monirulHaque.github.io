
// Real-time citation count fetcher
document.addEventListener("DOMContentLoaded", async function() {
    const citationLink = document.getElementById('citation-link');
    if (citationLink) {
        const targetUrl = citationLink.href;
        // Using allorigins.win as a CORS proxy to fetch the content
        // Adding a timestamp to bypass caching for 'realtime' effect
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}&timestamp=${new Date().getTime()}`;

        try {
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            if (data.contents) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.contents, "text/html");
                
                // XPath provided by user: /html/body/div/div[10]/div[3]/div/text()[1]
                const xpath = "/html/body/div/div[10]/div[3]/div/text()[1]";
                const result = doc.evaluate(xpath, doc, null, XPathResult.STRING_TYPE, null);
                
                if (result.stringValue && result.stringValue.trim() !== '') {
                    citationLink.innerText = result.stringValue.trim();
                }
            }
        } catch (error) {
            console.error("Failed to fetch citation count:", error);
        }
    }
});
