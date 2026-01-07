import time
import psutil
import requests
import os

# Configuration
API_URL = "http://<YOUR_OCI_IP>:3000/api/stats"
API_KEY = "<YOUR_SECRET_API_KEY>"

def get_stats():
    # CPU
    cpu = psutil.cpu_percent(interval=1)
    
    # RAM
    ram = psutil.virtual_memory().percent
    
    # Temperature (Linux only)
    try:
        temps = psutil.sensors_temperatures()
        if 'cpu_thermal' in temps:
            temp = temps['cpu_thermal'][0].current
        else:
            temp = 0
    except:
        temp = 0

    # Network (Bytes since boot, calculate diff for rate)
    net = psutil.net_io_counters()
    
    return {
        "cpu": cpu,
        "ram": ram,
        "temp": temp,
        "netIn": 0, # Simplified for now
        "netOut": 0
    }

def main():
    print("Starting Homelab Monitor...")
    while True:
        try:
            stats = get_stats()
            headers = {"x-api-key": API_KEY}
            response = requests.post(API_URL, json=stats, headers=headers)
            if response.status_code == 200:
                print(f"Sent: {stats}")
            else:
                print(f"Error: {response.status_code}")
        except Exception as e:
            print(f"Connection Error: {e}")
        
        time.sleep(5) # Send every 5 seconds

if __name__ == "__main__":
    main()
