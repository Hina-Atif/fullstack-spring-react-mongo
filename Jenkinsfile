pipeline {
    agent any

    stages {

        stage('Build Frontend Image') {
            steps {
                echo "Building frontend Docker image..."
                sh """
                cd frontend
                docker build -t hina-frontend:latest .
                """
            }
        }

        stage('Build Backend Image') {
            steps {
                echo "Building backend Docker image..."
                sh """
                cd backend
                docker build -t hina-backend:latest .
                """
            }
        }

        stage('Stop Old Containers') {
            steps {
                echo "Stopping old containers..."
                sh """
                docker stop frontend || true
                docker stop backend || true
                docker rm frontend || true
                docker rm backend || true
                """
            }
        }

        stage('Run New Containers') {
            steps {
                echo "Running new containers..."
                sh """
                docker run -d --name frontend -p 3000:3000 hina-frontend:latest
                docker run -d --name backend -p 5000:5000 hina-backend:latest
                """
            }
        }
    }
}
