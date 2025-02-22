# Use official Python image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Expose the Flask port
EXPOSE 5000

# Default command: Run Flask app
CMD ["python", "src/app.py"]
