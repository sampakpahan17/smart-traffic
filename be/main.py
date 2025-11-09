from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from video_stream import (
    generate_frames,
    get_latest_data,
    get_all_data_summary,
    CCTV_STREAMS,
    start_all_streams
)

app = FastAPI(title="Smart Traffic Vision API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    start_all_streams()
    print("[INFO] Semua stream CCTV sudah aktif otomatis.")

@app.get("/")
def root():
    return {
        "message": "Smart Traffic Vision API is running",
        "locations": list(CCTV_STREAMS.keys())
    }


@app.get("/stream/{location}")
def stream_video(location: str):
    if location not in CCTV_STREAMS:
        raise HTTPException(status_code=404, detail="Location not found")
    return StreamingResponse(
        generate_frames(location),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

@app.get("/data/{location}")
def get_data(location: str):
    if location == "all":
        return get_all_data_summary()
    if location not in CCTV_STREAMS:
        raise HTTPException(status_code=404, detail="Location not found")
    return get_latest_data(location)
