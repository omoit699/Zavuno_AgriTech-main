# Zavuno Platform - Azure Deployment Plan

**Status**: Planning Phase  
**Date Created**: May 4, 2026  
**Target**: Deploy React/Vite frontend to Azure

## Executive Summary

Zavuno is a React 18 + Vite + Tailwind CSS single-page application for agricultural marketplace. This plan details deployment to Azure for public sharing with viewers.

---

## Phase 1: Planning

### 1. Workspace Analysis

- **Mode**: MODIFY (existing React app)
- **Project Type**: Frontend-only React SPA
- **Build Tool**: Vite
- **Framework**: React 18.2.0
- **Styling**: Tailwind CSS 3.4.1
- **Entry Point**: index.html → main.jsx → App.jsx

### 2. Requirements

- **Scope**: Production-ready deployment
- **Access**: Public URL for sharing with viewers
- **Scale**: Small to medium (initial launch)
- **Budget**: Cost-optimized
- **CI/CD**: Preferred (GitHub integration optional)

### 3. Codebase Scan

**Technologies Identified**:

- React 18.2.0
- Vite 5.0.0
- Tailwind CSS 3.4.1
- No backend API
- No database required
- No authentication backend needed

**Components**:

- Single-page application (SPA)
- All state managed client-side
- External APIs: Unsplash (images), WhatsApp Web integration
- Static assets: Images (external CDN)

### 4. Recipe Selection

**Recommended**: Azure Static Web Apps (SWA)

**Why Azure Static Web Apps**:
✅ Perfect for React/Vite SPAs  
✅ Automatic CI/CD from GitHub  
✅ Free SSL/TLS certificates  
✅ Global CDN for fast delivery  
✅ Integrated Azure Functions for future backend  
✅ Simple deployment workflow  
✅ Cost-effective pricing

**Alternative Options**:

- Azure App Service: More overhead, not needed for frontend-only app
- Azure Container Apps: Over-engineered for static SPA

### 5. Architecture Plan

**Deployment Target**: Azure Static Web Apps

**Components**:

```
Zavuno Platform (React SPA)
    ├── Production Build (npm run build)
    ├── Static Assets (CSS, JS, Images from Unsplash)
    └── Global CDN via Static Web Apps
```

**Public URL Format**: `https://zavuno-<unique-name>.azurewebsites.net/`

**Services**:

- Static Web Apps (frontend hosting + CDN)
- GitHub repository (source control + CI/CD triggers)
- Build: Vite production build

### 6. Implementation Approach

**Steps**:

1. ✅ Create `.azure/deployment-plan.md` (this file)
2. Create GitHub Actions workflow for CI/CD
3. Generate Bicep infrastructure template
4. Create `azure.yaml` configuration
5. Prepare build output
6. Hand off to azure-validate for validation
7. Deploy via azure-deploy

**Build Command**: `npm install && npm run build`  
**Output Folder**: `dist/`

---

## Phase 2: Execution (Pending Approval)

- [x] Confirm Azure subscription and region
- [x] Generate infrastructure (Bicep)
- [x] Set up GitHub repository link
- [x] Create build pipeline
- [ ] Validate deployment
- [ ] Deploy to Azure
- [ ] Share public URL

---

## Deployment Details

**GitHub Repository**: https://github.com/omoit699/Zavuno_AgriTech  
**Target Azure Region**: South Africa North  
**Resource Group**: (Auto-generated)  
**Static Web Apps Instance**: zavuno-agri-tech

## Generated Artifacts

- `.github/workflows/azure-static-web-apps.yml`
- `infra/static-web-app.bicep`
- `staticwebapp.config.json`
- `azure.yaml`

---

**Next**: Present this plan to user for approval before proceeding with Phase 2.
