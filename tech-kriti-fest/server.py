#!/usr/bin/env python3
"""
TECH KRITI 2026 - Local Development & Showcase Server
Starts an HTTP server on port 8080 (or auto-finds open port) and launches the website in the default browser.
"""

import http.server
import socketserver
import os
import sys
import webbrowser
import socket

DEFAULT_PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class TechKritiHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable caching for active development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def find_available_port(start_port):
    port = start_port
    while port < start_port + 50:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('127.0.0.1', port)) != 0:
                return port
            port += 1
    return start_port

def run_server():
    os.chdir(DIRECTORY)
    port = find_available_port(DEFAULT_PORT)
    url = f"http://localhost:{port}/index.html"

    print("=" * 65)
    print("  🚀 TECH KRITI 2026 — OFFICIAL FESTIVAL PLATFORM SERVER")
    print("=" * 65)
    print(f"  📂 Serving Directory: {DIRECTORY}")
    print(f"  🌐 Local Server URL:  {url}")
    print(f"  📱 Responsive Views:  Desktop, Tablet, Mobile")
    print(f"  💳 Payment Enabled:   Paytm UPI QR (Payee: Rishab Kumar Jha) + 12-Digit UTR Verification")
    print(f"  🎓 Pricing Tier:      ₹50 DSEU Campus / ₹100 Outside / All Events 100% FREE")
    print("=" * 65)
    print("  Press Ctrl+C to stop the server at any time.")
    print("=" * 65)

    # Launch browser automatically
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"  Could not open browser automatically: {e}")

    with socketserver.TCPServer(("", port), TechKritiHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Server stopped successfully. Thank you for using Tech Kriti!")
            sys.exit(0)

if __name__ == "__main__":
    run_server()
