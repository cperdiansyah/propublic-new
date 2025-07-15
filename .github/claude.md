# Instructions for Claude

## Code Review Guidelines

- **Readability:** Are variable and function names clear? Are comments appropriate?
- **Performance:** Are there any unnecessary loops or inefficient processes?
- **Security:** Are there risks of SQL injection or cross-site scripting?
- **Custom Rule:** All constants must be defined in uppercase snake_case.

---

## Vulnerability Scan Guidelines

Please scan the entire source code for vulnerabilities, focusing on the OWASP Top 10.
The scan results should be output in the format described below.

### Required Keywords

The vulnerability scan results must include the following keywords:

**On scan completion:**

- Vulnerabilities found: `VULNERABILITY_SCAN_RESULT: ISSUES_FOUND`
- No issues found: `VULNERABILITY_SCAN_RESULT: CLEAN`

**Severity notation:**

- `SEVERITY: CRITICAL` (If critical vulnerabilities exist)
- `SEVERITY: HIGH` (If high vulnerabilities exist)

### Example Scan Report Format

VULNERABILITY_SCAN_RESULT: ISSUES_FOUND
SEVERITY: CRITICAL
