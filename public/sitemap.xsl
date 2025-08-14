<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
    
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>Quotely Sitemap - Website Structure Overview</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style type="text/css">
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        padding: 2rem;
                        line-height: 1.6;
                    }
                    
                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        background: white;
                        border-radius: 1rem;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        overflow: hidden;
                    }
                    
                    .header {
                        background: linear-gradient(135deg, #FF4655 0%, #E63946 100%);
                        color: white;
                        padding: 3rem 2rem;
                        text-align: center;
                    }
                    
                    .header h1 {
                        font-size: 2.5rem;
                        font-weight: 700;
                        margin-bottom: 0.5rem;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    
                    .header p {
                        font-size: 1.1rem;
                        opacity: 0.95;
                    }
                    
                    .stats {
                        display: flex;
                        justify-content: center;
                        gap: 3rem;
                        margin-top: 2rem;
                        padding-top: 2rem;
                        border-top: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    
                    .stat {
                        text-align: center;
                    }
                    
                    .stat-value {
                        font-size: 2rem;
                        font-weight: 700;
                        display: block;
                    }
                    
                    .stat-label {
                        font-size: 0.875rem;
                        opacity: 0.9;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                    }
                    
                    .content {
                        padding: 2rem;
                    }
                    
                    .info-box {
                        background: #f8fafc;
                        border-left: 4px solid #FF4655;
                        padding: 1.5rem;
                        margin-bottom: 2rem;
                        border-radius: 0.5rem;
                    }
                    
                    .info-box h2 {
                        color: #1a365d;
                        font-size: 1.5rem;
                        margin-bottom: 0.5rem;
                    }
                    
                    .info-box p {
                        color: #4a5568;
                    }
                    
                    .url-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 2rem;
                    }
                    
                    .url-table thead {
                        background: #1a365d;
                        color: white;
                    }
                    
                    .url-table th {
                        padding: 1rem;
                        text-align: left;
                        font-weight: 600;
                        font-size: 0.875rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                    }
                    
                    .url-table tbody tr {
                        border-bottom: 1px solid #e2e8f0;
                        transition: all 0.3s ease;
                    }
                    
                    .url-table tbody tr:hover {
                        background: #f8fafc;
                        transform: translateX(4px);
                    }
                    
                    .url-table td {
                        padding: 1rem;
                        color: #2d3748;
                    }
                    
                    .url-table td:first-child {
                        font-weight: 500;
                    }
                    
                    .url-link {
                        color: #FF4655;
                        text-decoration: none;
                        transition: all 0.3s ease;
                        display: inline-block;
                        max-width: 600px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    
                    .url-link:hover {
                        color: #E63946;
                        text-decoration: underline;
                    }
                    
                    .priority {
                        display: inline-block;
                        padding: 0.25rem 0.75rem;
                        border-radius: 1rem;
                        font-size: 0.875rem;
                        font-weight: 600;
                    }
                    
                    .priority-high {
                        background: #dcfce7;
                        color: #16a34a;
                    }
                    
                    .priority-medium {
                        background: #fef3c7;
                        color: #d97706;
                    }
                    
                    .priority-low {
                        background: #f3f4f6;
                        color: #6b7280;
                    }
                    
                    .frequency {
                        display: inline-block;
                        padding: 0.25rem 0.75rem;
                        background: #e0e7ff;
                        color: #4338ca;
                        border-radius: 0.25rem;
                        font-size: 0.75rem;
                        font-weight: 600;
                        text-transform: uppercase;
                    }
                    
                    .date {
                        color: #6b7280;
                        font-size: 0.875rem;
                    }
                    
                    .footer {
                        background: #f8fafc;
                        padding: 2rem;
                        text-align: center;
                        color: #4a5568;
                        border-top: 1px solid #e2e8f0;
                    }
                    
                    .footer a {
                        color: #FF4655;
                        text-decoration: none;
                        font-weight: 600;
                    }
                    
                    .footer a:hover {
                        text-decoration: underline;
                    }
                    
                    .section-divider {
                        margin: 2rem 0;
                        padding: 0.75rem 1rem;
                        background: linear-gradient(90deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%);
                        color: #4a5568;
                        font-weight: 600;
                        font-size: 0.875rem;
                        text-transform: uppercase;
                        letter-spacing: 0.1em;
                        border-radius: 0.25rem;
                    }
                    
                    @media (max-width: 768px) {
                        body {
                            padding: 1rem;
                        }
                        
                        .header h1 {
                            font-size: 1.75rem;
                        }
                        
                        .stats {
                            flex-direction: column;
                            gap: 1rem;
                        }
                        
                        .url-table {
                            font-size: 0.875rem;
                        }
                        
                        .url-table th,
                        .url-table td {
                            padding: 0.5rem;
                        }
                        
                        .url-link {
                            max-width: 200px;
                        }
                        
                        .priority,
                        .frequency {
                            font-size: 0.7rem;
                            padding: 0.2rem 0.5rem;
                        }
                    }
                    
                    /* Loading animation */
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    tbody tr {
                        animation: fadeIn 0.5s ease forwards;
                        opacity: 0;
                    }
                    
                    tbody tr:nth-child(1) { animation-delay: 0.05s; }
                    tbody tr:nth-child(2) { animation-delay: 0.1s; }
                    tbody tr:nth-child(3) { animation-delay: 0.15s; }
                    tbody tr:nth-child(4) { animation-delay: 0.2s; }
                    tbody tr:nth-child(5) { animation-delay: 0.25s; }
                    tbody tr:nth-child(6) { animation-delay: 0.3s; }
                    tbody tr:nth-child(7) { animation-delay: 0.35s; }
                    tbody tr:nth-child(8) { animation-delay: 0.4s; }
                    tbody tr:nth-child(9) { animation-delay: 0.45s; }
                    tbody tr:nth-child(10) { animation-delay: 0.5s; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🗺️ Quotely Website Sitemap</h1>
                        <p>Complete index of all pages for search engines and visitors</p>
                        <div class="stats">
                            <div class="stat">
                                <span class="stat-value">
                                    <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
                                </span>
                                <span class="stat-label">Total Pages</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">
                                    <xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority >= 0.8])"/>
                                </span>
                                <span class="stat-label">High Priority</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">Daily</span>
                                <span class="stat-label">Update Frequency</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="content">
                        <div class="info-box">
                            <h2>📊 About This Sitemap</h2>
                            <p>
                                This XML sitemap is used by search engines like Google, Bing, and Yahoo to better understand 
                                the structure of tryquotely.com. It contains <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URLs 
                                and is automatically updated to reflect new content and changes.
                            </p>
                        </div>
                        
                        <table class="url-table">
                            <thead>
                                <tr>
                                    <th width="5%">#</th>
                                    <th width="50%">URL</th>
                                    <th width="15%">Last Modified</th>
                                    <th width="15%">Change Frequency</th>
                                    <th width="15%">Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                <xsl:for-each select="sitemap:urlset/sitemap:url">
                                    <xsl:sort select="sitemap:priority" order="descending"/>
                                    <tr>
                                        <td>
                                            <xsl:value-of select="position()"/>
                                        </td>
                                        <td>
                                            <a class="url-link" target="_blank">
                                                <xsl:attribute name="href">
                                                    <xsl:value-of select="sitemap:loc"/>
                                                </xsl:attribute>
                                                <xsl:value-of select="sitemap:loc"/>
                                            </a>
                                        </td>
                                        <td>
                                            <span class="date">
                                                <xsl:value-of select="sitemap:lastmod"/>
                                            </span>
                                        </td>
                                        <td>
                                            <span class="frequency">
                                                <xsl:value-of select="sitemap:changefreq"/>
                                            </span>
                                        </td>
                                        <td>
                                            <xsl:choose>
                                                <xsl:when test="sitemap:priority >= 0.8">
                                                    <span class="priority priority-high">
                                                        <xsl:value-of select="sitemap:priority"/>
                                                    </span>
                                                </xsl:when>
                                                <xsl:when test="sitemap:priority >= 0.5">
                                                    <span class="priority priority-medium">
                                                        <xsl:value-of select="sitemap:priority"/>
                                                    </span>
                                                </xsl:when>
                                                <xsl:otherwise>
                                                    <span class="priority priority-low">
                                                        <xsl:value-of select="sitemap:priority"/>
                                                    </span>
                                                </xsl:otherwise>
                                            </xsl:choose>
                                        </td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="footer">
                        <p>
                            <strong>Quotely</strong> - The Transparent AI-Powered Insurance Platform<br/>
                            View our <a href="/">Homepage</a> | <a href="/get-started">Get Started</a> | <a href="/demo">Watch Demo</a>
                        </p>
                        <p style="margin-top: 1rem; font-size: 0.875rem;">
                            This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs and was generated for tryquotely.com
                        </p>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>