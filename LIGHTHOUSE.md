# Lighthouse CI Setup

This project uses Lighthouse CI to automatically test performance, accessibility, SEO, and best practices.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Lighthouse Locally

**Option A: Test Production Site**

```bash
npm run lighthouse
```

This tests your deployed site at `https://my-store-hazel-chi.vercel.app`

**Option B: Test Local Development**

```bash
# In one terminal, start your dev server:
npm run dev

# In another terminal, run Lighthouse:
npm run lighthouse:local
```

## Performance Thresholds

The following thresholds are enforced:

### Critical (Will Fail Build)

- **Performance Score**: ≥ 85%
- **Cumulative Layout Shift (CLS)**: ≤ 0.1

### Warnings

- **Accessibility Score**: ≥ 90%
- **Best Practices Score**: ≥ 90%
- **SEO Score**: ≥ 90%
- **Largest Contentful Paint (LCP)**: ≤ 2.5s
- **Total Blocking Time (TBT)**: ≤ 200ms
- **First Contentful Paint (FCP)**: ≤ 1.8s

## Configuration Files

- **`lighthouserc.json`**: Production config (tests live site)
- **`lighthouserc.local.json`**: Development config (tests localhost:3001)
- **`.github/workflows/lighthouse.yml`**: GitHub Actions CI workflow

## GitHub Actions

Lighthouse CI runs automatically on:

- Push to `main` or `master` branch
- Pull requests targeting `main` or `master`

Results are uploaded as artifacts in GitHub Actions.

## Viewing Results

After running locally, results are saved in `.lighthouseci/` directory. You can:

1. **View JSON reports**: `.lighthouseci/*.json`
2. **Upload to temporary storage**: Results are auto-uploaded to Lighthouse CI's temporary public storage (link shown in console)
3. **View in CI**: Check GitHub Actions artifacts

## Modifying Thresholds

Edit the `assertions` section in `lighthouserc.json`:

```json
"assertions": {
  "categories:performance": ["error", {"minScore": 0.85}],
  "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}]
}
```

- `"error"` = Build fails if threshold not met
- `"warn"` = Shows warning but doesn't fail
- `minScore` = Minimum score (0-1 scale)
- `maxNumericValue` = Maximum allowed value for metrics

## Testing Different Pages

Add more URLs to test in `lighthouserc.json`:

```json
"url": [
  "https://my-store-hazel-chi.vercel.app/en",
  "https://my-store-hazel-chi.vercel.app/en/products/beauty",
  "https://my-store-hazel-chi.vercel.app/en/cart"
]
```

## Troubleshooting

**Server not responding**: Make sure your dev server is running on port 3001 before running `lighthouse:local`

**Tests failing**: Check the `.lighthouseci/` folder for detailed reports

**CI failing**: Ensure your Vercel deployment is live before the CI runs
