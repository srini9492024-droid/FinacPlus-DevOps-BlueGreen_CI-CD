pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "srinivas202"
        DOCKERHUB_APP = "finacplus-bluegreen-app"
    }

    stages {

        stage('Checkout Source (FinacPlus)') {
            steps {
                git branch: 'main', url: 'https://github.com/srini9492024-droid/FinacPlus-DevOps-BlueGreen_CI-CD.git'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub',
                        usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                cd app
                docker build -t $DOCKERHUB_USER/$DOCKERHUB_APP:$BUILD_NUMBER .
                '''
            }
        }

        stage('Docker Push') {
            steps {
                sh '''
                docker push $DOCKERHUB_USER/$DOCKERHUB_APP:$BUILD_NUMBER
                '''
            }
        }

        stage('Deploy Green Version') {
            steps {
                sh '''
                sed -i "s/IMAGE_TAG/$BUILD_NUMBER/g" k8s/finacplus-deployment-green.yaml
                kubectl apply -f k8s/finacplus-deployment-green.yaml
                kubectl rollout status deployment/finacplus-green
                '''
            }
        }

        stage('Switch Traffic to GREEN') {
            steps {
                sh '''
		#kubectl delete -f k8s/finacplus-service.yaml --ignore-not-found=true
                kubectl apply -f k8s/finacplus-service.yaml
                '''
            }
        }
    }

    post {
        failure {
            sh 'bash k8s/finacplus-rollback-blue.sh'
        }
        success {
            echo "FinacPlus Deployment Successful!"
        }
    }
}

