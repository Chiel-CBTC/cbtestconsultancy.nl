## MODIFIED Requirements

### Requirement: Footer navigation links
The footer SHALL contain navigation links to: Home, Portfolio, About, Blog, Contact, and **Disclaimer**.

#### Scenario: Disclaimer link in footer
- **WHEN** any page is rendered
- **THEN** the footer nav contains a link to `/disclaimer` with label "Disclaimer"

#### Scenario: Disclaimer link hover state
- **WHEN** a user hovers the Disclaimer footer link
- **THEN** the link color transitions to `text-accent`
