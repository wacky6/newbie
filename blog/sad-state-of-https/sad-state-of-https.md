[](~
    title:    Sad State of HTTPS Deployment
    ctime:    2016-05-29
    mtime:    2016-05-29
    tags:     安全
    keywords: https, deployment, statistics, security
    
    brief: |
      In May 2016, I analyzed Alexa Top-10000 website's HTTPS deployment. 
      
      **19.4%** actively deploy HTTPS, only **3.7%** are likely to be secure.
      
      This result is pretty shocking, read more for detail.
    
    description: |
      In May 2016, I analyzed Alexa Top-10000 website's HTTPS deployment. The result is SHOCKING. Only 19.4% actively deploy HTTPS. Among all websites, approx. 3.7% are likely to be secure.
    
~)

<style>
table tbody tr td, table thead tr th {
  text-align: right;
}
table thead tr th:first-child {
  text-align: center;
}
table tbody tr td:first-child {
	text-align: center;
	border-width: 0 1pt 0 0;
}
article blockquote p~p {
	margin-top: 1em;
}
.resources li a {
  text-decoration: none;
}
</style>


Sad State of HTTPS Deployment
===

Data was collected during **May 2016**, using Alexa's Top One Million data.

|                    |  Amount  | % of All | % of HTTPS |
|--------------------|----------|----------|------------|  
| Deploys HTTPS      |   1858   |**19.4%** |            |
| ^ SSLv3 (Insecure) |    255   |          |   13.7%    |
| ^ TLSv1.0          |   1687   |          |   90.1%    |
| ^ TLSv1.1, TLSv1.2 |   1610   |          |   88.1%    |
| HSTS               |    497   |   5.2%   |   26.7%    |
| HSTS Preload       |    118   |   1.2%   |    6.4%    |
| PKP Report Only    |      4   |   0.0%   |    0.2%    |
| PKP                |      9   |   0.1%   |    0.4%    |
| X-Frame-Options    |    840   |          |   45.2%    |
| X-XSS-Protection   |    466   |          |   25.1%    |
| Mixed Content      |     92   |          |    5.0%    |
| **Likely Secure**  |  **355** | **3.7%** |**~19.1%**  |
| **Total**          | **9601** |          |  &nbsp;    |

Honestly, I was expecting a much better result. It's **SHOCKING** that most websites offers **no security at all** (zero or weak HTTPS).

> **Why "Likely Secure"?**
> 
> As we know, it's easy to get security **WRONG**. The scan method used is simple and only checks prerequisites, which is insufficient to prove security.
> 
> Even a website implements robust TLS/STS, it could still be vulnerable to application specific attacks, such as SQL injection and XSS.
> 
> ^ Cipher suite scan was completed on 1708 websites, due to an incident.

#### Strict-Transport-Security Max-Age Distribution

| Upper-bound   |  Amount |     %     |
|--------------|---------|-----------|
|   1 minute   |    19   |    3.8%   |
|   1 hour     |    31   |    6.4%   |
|   1 day      |    40   |    8.0%   |
|  30 days     |    67   |   13.5%   | 
| **180 days** | **147** | **29.6%** |
| **365 days** | **450** | **90.5%** |
| > 365 days   |   497   |    100%   |

Most (about 270) websites choose a **one year** max-age. Coming second (about 30) is **half-a-year**. Interestingly, 16 sites use zero second max-age.



## What's Wrong?
HTTPS deployment is way behind what it should be.

#### Why huge difference from [SSL Pulse](https://www.trustworthyinternet.org/ssl-pulse/)?

First of all, methodologies are different. Second, datasets are different, SSL Pulse uses SSLLab's data, it's unclear what's surveyed and included in the report.

If SSL Pulse includes scan results requested by users, their result could be optimistic. SSLLabs users do care about security (or they won't be using SSLLabs). They are likely to implement better security policies.

#### SSLv3
Some websites still support it, especially large ones (such as Google), they have to serve legacy users (namely, Windows XP, old Androids).

#### PKP
Literally, no one uses Public-Key-Pins. 

PKP protects against MITM and CA foul play. It effectively ensures client can only talk to servers holding particular private keys (through pinned public key hash).



## Methodology
PhantomJS is used to simulate browser behavior. It initiates a HTTP request to target domain, loads all resources, outputs request/response information for analysis (Just like Chrome developer tools).

> This means websites supports only HTTPS is excluded.
> 
> Even assuming these websites all implement robust TLS and STS, the percentage of likely secure websites is still less than 8%.

Non-www domain is first tried. If it fails, www-prefixed domain is tried. If both fails. If both fails (connection failure or non-20x response), this domain excluded from result.

First, landing page is determined (first non-30x response). It is referred as index in the following part.

A website is considered to have **HTTPS deployed**, if index is loaded via HTTPS. (Requires redirecting HTTP requests to HTTPS).

Cipher suite is scanned with forked [sslscan](https://github.com/wacky6/sslscan). 

A website is considered to be **Likely Secure**, if it:

* Disables SSLv3 (Only supports TLSv1.0 and above)
* Disables RC4/MD5
* Loads everything via HTTPS
* Deploys Strict-Transport-Security (max-age >= 30 days)



## The "Incident"
I was planning to scan all HTTPS websites. However, one (presumably stupid and paranoid) network manager decided such scan is an attack against his server, and requested my VPS provider to suspend my server.

As a result, I had to spend two days talking through customer service to get my server back online. As a "precaution", my provider requires I stop such scanning, or get my account banned.

After acquiring more detail, I suspect the heartbleed scan (enabled by default) may be identified as an attack. This is later confirmed using my friend's computer with Norton Firewall. 

Technically, it was a programming mistake. I didn't bothered to turn off this extraneous scan. (The data I want were protocol versions and cipher suites, vulnerability clearly was not part of them)

But, an interesting point, as I see, is that heartbleed should **be patched and fixed way back in 2014** and should not be an issue in 2016. If it is fixed, an attempted "exploit" of heartbleed should go into syslog.info or ignored rather than warn.

In my opinion, that network manager is diffident and ignorant (no offense). He can't tell the difference between false and real problem, and decide everything other than normal HTTP requests are malicious.

**This is just not a proper attitude towards security.**



## Useful Resources
I use these resources to deploy my website's HTTPS.

[](< .resources >)

* [TLS/DTLS Best Practice (RFC 7525)](https://www.rfc-editor.org/rfc/rfc7525.txt)
* [Scott Helme's Blog](https://scotthelme.co.uk/)
* [SSLLabs Scan](http://ssllabs.com/)
* [SSLLabs TLS Best Practices)(https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices)
* [Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/Security/HTTP_strict_transport_security)
* [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options)
* [Mozilla's HTTPS conf generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
* [PKP/CSP Report Collector](https://report-uri.io/)


## Raw Data
Raw data (110MB) available at: [cdn.wacky.one](https://cdn.wacky.one/sites_survey.crawl.ndjson.gz).

Raw data is stored as [newline-delimited JSON](http://ndjson.org/). Have fun experimenting on it.

