@echo off
echo Starting MediLeaf AI Application...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed or not in PATH
    echo Please install Python 3.8+ and try again
    pause
    exit /b 1
)

REM Install requirements if they don't exist
echo Installing required packages...
pip install -r requirements.txt

REM Check if model file exists
if not exist "efficientnet_b3_model.pth" (
    echo Error: Model file 'efficientnet_b3_model.pth' not found!
    echo Please ensure the model file is in the current directory.
    pause
    exit /b 1
)

echo.
echo Starting Flask application...
echo Open your browser and go to: http://localhost:5000
echo Press Ctrl+C to stop the application
echo.

python app.py

pause
