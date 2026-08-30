# Security Policy

## Khethi in Tech

Thank you for helping keep Khethi in Tech secure.

Security issues are taken seriously. If you discover a vulnerability or security-related issue, please report it responsibly rather than publicly disclosing the issue before it has been investigated.

## Reporting a Vulnerability

Please report security vulnerabilities privately using the project's designated contact method.

When reporting an issue, include:

* A clear description of the vulnerability.
* The affected feature, page, component, or dependency.
* Steps required to reproduce the issue.
* The potential impact.
* Screenshots, logs, or proof-of-concept material where appropriate.
* Any suggested mitigation, if known.

Please do not include passwords, authentication tokens, API keys, personal information, or other sensitive information in the report.

## Responsible Disclosure

Please allow reasonable time for the issue to be investigated and addressed before publicly disclosing the vulnerability.

Security researchers who report vulnerabilities responsibly will be acknowledged where appropriate and with their permission.

## Scope

Security reports may include issues involving:

* Authentication.
* Authorisation.
* Data exposure.
* Input validation.
* Cross-site scripting.
* Injection vulnerabilities.
* Insecure dependencies.
* Access-control problems.
* Configuration issues.
* Sensitive information exposure.

Third-party services and infrastructure may have their own security policies and reporting procedures.

## Out of Scope

The following are generally not considered security vulnerabilities unless they create a meaningful security impact:

* Minor visual bugs.
* General feature requests.
* Performance issues without a security impact.
* Social engineering attempts against project contributors.
* Issues in unrelated third-party services.

## Security Practices

Khethi in Tech aims to follow secure development practices including:

* Keeping dependencies updated.
* Avoiding hard-coded secrets.
* Using environment variables for sensitive configuration.
* Validating untrusted input.
* Following least-privilege principles.
* Protecting sensitive user information.
* Reviewing third-party dependencies.
* Using HTTPS in production.
* Regularly reviewing the project's security configuration.

## Secrets

Never commit the following to the repository:

* API keys.
* Passwords.
* Access tokens.
* Private keys.
* Database credentials.
* Authentication secrets.
* Production environment variables containing sensitive information.

Sensitive configuration should be stored outside the source repository.

## Policy Updates

This security policy may be updated as the project architecture and security requirements evolve.
