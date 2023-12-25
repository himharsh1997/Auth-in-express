/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    environment {
        // Define environment variables as needed
        NODE_HOME = tool 'NodeJS' // Assumes you have a NodeJS tool configured in Jenkins
        PATH = "${env.PATH}:${NODE_HOME}/bin"
    }

    stages {
        stage('Checkout') {
            steps {
                /* groovylint-disable-next-line LineLength */
                // Checkout source code from GitHub (replace 'your-username' and 'your-repo' with your GitHub username and repository)
                /* groovylint-disable-next-line LineLength */
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[url: 'https://github.com/himharsh1997/Auth-in-express.git']]])
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests using a test framework (e.g., Mocha)
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                // Perform any additional build or deployment steps here
                // This example assumes the application is a simple Express server
                script {
                    sh 'npm run build'
                    sh 'npm start'  // Start the Express server
                }
            }
        }
    }

    post {
        success {
            // This block is executed if the pipeline succeeds
            echo 'Pipeline succeeded! Deployed successfully.'
        }

        failure {
            // This block is executed if the pipeline fails
            echo 'Pipeline failed. Deployment unsuccessful.'
        }
    }
}
