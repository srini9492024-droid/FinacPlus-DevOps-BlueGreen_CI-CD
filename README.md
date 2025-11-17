# FinacPlus DevOps Blue-Green CI/CD Pipeline

This project implements a full CI/CD pipeline using:

- **Jenkins**
- **Docker**
- **DockerHub**
- **Kubernetes (Minikube)**
- **Blue-Green Deployment Strategy**

---

# 📌 Architecture

```
Developer → GitHub → Jenkins → DockerHub → Minikube (K8s)
                        |              |
                        |              → Green Deployment
                        → Blue Deployment
```

---

# 📌 Pipeline Flow

1. Developer commits code to GitHub  
2. Jenkins checks out source  
3. Jenkins builds Docker image  
4. Jenkins pushes image to DockerHub  
5. Jenkins deploys **Green** in Kubernetes  
6. If deployment is healthy → traffic switches to Green  
7. If failed → traffic rolls back to Blue  

---

# 📌 Blue-Green Deployment

- **Blue** = current stable version  
- **Green** = new release  
- Traffic is switched by updating Service selector:

```
version: blue → version: green
```

Rollback uses:

```
version: green → version: blue
```

---

# 📌 How to Access App

Use port-forward:

```
kubectl port-forward svc/finacplus-service 9090:80 --address=0.0.0.0
```

Then open in browser:

```
http://<EC2-PUBLIC-IP>:9090
```

---

# 📌 Rollback

```
bash k8s/finacplus-rollback-blue.sh
```

---

# 📌 Repository Structure

```
app/                         → Node.js Application
k8s/                         → Kubernetes Manifests
Jenkinsfile                  → CI/CD Pipeline
README.md                    → Documentation
```

---

# 📌 Technologies Used

- Jenkins
- Docker
- DockerHub
- Kubernetes
- Minikube
- Node.js
- Blue-Green Deployment Strategy

---

# ⭐ Status  
This project fully implements the **FinacPlus DevOps Assignment** end-to-end.

