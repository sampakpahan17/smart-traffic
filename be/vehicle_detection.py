from ultralytics import YOLO
import cv2

# Load model YOLOv8
model = YOLO("yolov8n.pt")

# Kelas kendaraan yang relevan
VEHICLE_CLASSES = ["car", "motorcycle", "bus", "truck"]

def detect_vehicles(frame):
    results = model(frame, verbose=False)[0]
    counts = {cls: 0 for cls in VEHICLE_CLASSES}

    for box in results.boxes:
        cls_id = int(box.cls[0])
        cls_name = model.names[cls_id]
        if cls_name in VEHICLE_CLASSES:
            counts[cls_name] += 1
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, cls_name, (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

    return frame, counts
