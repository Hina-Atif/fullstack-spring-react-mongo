pipeline {
    agent any

    environment {
        BACKEND_DIR = "backend"
        FRONTEND_DIR = "frontend"
        DOCKERHUB_USER = "hina"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend JAR') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'docker build -t %DOCKERHUB_USER%/backend-app:latest .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'docker build -t %DOCKERHUB_USER%/frontend-app:latest .'
                }
            }
        }

        stage('Run Containers for Testing') {
    steps {
        bat 'docker stop backend-app || echo Not running'
        bat 'docker rm backend-app || echo Not existing'
        bat 'docker stop frontend-app || echo Not running'
        bat 'docker rm frontend-app || echo Not existing'

        bat 'docker run -d -p 8081:8080 --name backend-app %DOCKERHUB_USER%/backend-app:latest'
        bat 'docker run -d -p 3000:80 --name frontend-app %DOCKERHUB_USER%/frontend-app:latest'
    }
}
