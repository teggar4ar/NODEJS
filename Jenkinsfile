pipeline {
  agent any

  environment {
    IMAGE = "teggar4ar/my-nodejs-app"
    DOCKER_CRED = "docker-hub"
    KUBECONFIG_CRED = "kubeconfig-dev"
    SONAR_TOKEN_CRED = "sonar-token-cred"
    SONAR_HOST_URL = "http://192.168.49.1:9000"
    NAMESPACE = "default"
    HELM_RELEASE = "learn1"
    GIT_REPO_URL = 'https://github.com/teggar4ar/NODEJS.git'
    GIT_BRANCH = 'main'
    SONAR_PROJECT_KEY = "learn-nodejs"
  }

  stages {
    stage('Checkout Source Code') {
      steps {
        git url: 'https://github.com/teggar4ar/NODEJS.git', branch: 'main'
      }
    }

    stage('Unit Tests') {
      steps {
        script {
          echo "🧪 Running unit tests..."
          sh 'npm install'
          sh 'npm test'
          echo "✅ Unit tests passed"
        }
      }
    }

    stage('Code analysis using SonarQube') {
      steps {
        withCredentials([string(credentialsId: "${SONAR_TOKEN_CRED}", variable: 'SONAR_LOGIN_TOKEN')]) {
          script {
            echo "🔍 Analyzing code with SonarQube..."
            sh """
               sonar-scanner \\
                -Dsonar.projectKey=${SONAR_PROJECT_KEY} \\
                -Dsonar.host.url=${SONAR_HOST_URL} \\
                -Dsonar.login=${SONAR_LOGIN_TOKEN}
            """
          }
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          echo "🐳 Building Docker image: ${IMAGE}:${TAG}"
          docker.build("${IMAGE}:${TAG}")
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_CRED}", usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh """
            echo "$PASS" | docker login -u "$USER" --password-stdin
            docker push ${IMAGE}:${TAG}
          """
        }
      }
    }

    stage('Deploy to Kubernetes (Helm)') {
      steps {
        withCredentials([file(credentialsId: "${KUBECONFIG_CRED}", variable: 'KUBE_FILE')]) {
          script {
            echo "🚀 Deploying to Kubernetes via Helm..."
            sh '''
              export KUBECONFIG=$KUBE_FILE
              helm upgrade --install $HELM_RELEASE ./helm \
                --set image.repository=$IMAGE \
                --set image.tag=$TAG \
                --namespace $NAMESPACE --create-namespace
            '''
          }
        }
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline Sukses: Aplikasi berhasil dideploy ke Kubernetes"
    }
    failure {
      echo "❌ Pipeline Gagal: Cek log untuk mengetahui error"
    }
    always {
      cleanWs()
      echo "🧹 Workspace cleaned up."
    }
  }
}
