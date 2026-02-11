
export const getCourseContent = (title: string, description: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: -apple-system, system-ui; padding: 20px; color: #333; }
        h1 { color: #2563eb; }
        .card { background: #f3f4f6; padding: 15px; border-radius: 10px; margin-top: 20px; }
        .token-box { word-break: break-all; font-family: monospace; font-size: 12px; background: #eee; padding: 10px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <p>${description}</p>
    
    <div class="card">
        <h3>User Session Debug</h3>
        <p><strong>User:</strong> <span id="username">Loading...</span></p>
        <p><strong>Token (Header Check):</strong></p>
        <div class="token-box" id="token">Waiting for injection...</div>
    </div>

    <script>
        // Listen for data from React Native
        document.addEventListener("message", function(event) {
            try {
                const data = JSON.parse(event.data);
                if (data.type === "SESSION_DATA") {
                    document.getElementById("username").innerText = data.payload.username;
                    document.getElementById("token").innerText = data.payload.token.substring(0, 20) + "...";
                }
            } catch (e) {
                console.error("Error parsing message", e);
            }
        });

        // Also try to read headers if possible (for remote URLs mainly, but good for demo)
        // Since we are loading HTML directly, we can't read request headers easily in JS without a fetch.
        // So we will simulate header verification by conducting a fetch to a dummy endpoint if needed, 
        // OR just rely on the injected data for this local demo.
    </script>
</body>
</html>
`;
