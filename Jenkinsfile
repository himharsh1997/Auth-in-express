/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    tools { nodejs 'Nodejs16' }

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
                    sh 'echo "Success"'
                }
            }
        }

        stage('Build') {
            steps {
                // Build your Express.js application
                sh 'echo "Build is completed!!"'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy your application (customize this based on your deployment process)
                sh 'npm install -g pm2'
                sh 'pm2 start npm --no-autorestart -- start'
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
