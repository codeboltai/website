import { Agent } from "../types/types";

export const additionalAgents:Agent[] = [
    {
        longDescription: "This agent assists with React development by providing code snippets, best practices, and debugging tips.",
        createdByUser: "jane_doe",
        avatarSrc: "/images/avatars/react.png",
        action: [
            {
                detailDescription: "Generates a new React component with the specified name.",
                name: "Generate Component",
                description: "Creates a new React component.",
                actionPrompt: "Please provide the name of the component."
            },
            {
                detailDescription: "Provides best practices for React development.",
                name: "Best Practices",
                description: "Lists best practices for React development.",
                actionPrompt: "Would you like to see best practices for React development?"
            }
        ],
        description: "React development assistant",
        id: "react-agent-001",
        title: "React Agent",
        avatarFallback: "R",
        slug: "react-agent",
        tags: ["React", "JavaScript", "TypeScript", "Web Development"],
        zipFilePath: "/downloads/react-agent.zip",
        featured: true,
        recommended: true,
        category: "Frameworks"
    },
    {
        longDescription: "This agent assists with Cloudflare Workers by providing code snippets, best practices, and debugging tips.",
        createdByUser: "alice_smith",
        avatarSrc: "/images/avatars/cloudeflare.png",
        action: [
            {
                detailDescription: "Generates a new Cloudflare Worker with the specified name.",
                name: "Generate Worker",
                description: "Creates a new Cloudflare Worker.",
                actionPrompt: "Please provide the name of the worker."
            },
            {
                detailDescription: "Provides best practices for Cloudflare Workers development.",
                name: "Best Practices",
                description: "Lists best practices for Cloudflare Workers development.",
                actionPrompt: "Would you like to see best practices for Cloudflare Workers development?"
            }
        ],
        description: "Cloudflare Workers development assistant",
        id: "cloudflare-agent-001",
        title: "Cloudflare Workers Agent",
        avatarFallback: "C",
        slug: "cloudflare-agent",
        tags: ["Cloudflare", "JavaScript", "Serverless", "Web Development"],
        zipFilePath: "/downloads/cloudflare-agent.zip",
        featured: true,
        recommended: true,
        category: "Serverless"
    },
		{
			"longDescription": "Angular Agent specializes in automating data entry tasks within Angular applications. Utilizing Angular's robust framework, it enhances efficiency and accuracy in data entry processes.",
			"createdByUser": "adminUser",
			"avatarSrc": "/images/avatars/angular.png",
			"action": [
				{
					"detailDescription": "Automatically fills in forms using predefined schemas and user data.",
					"name": "Form Autofill",
					"description": "Handles the automatic completion of forms within an Angular application.",
					"actionPrompt": "Start form autofill process"
				}, {
					"detailDescription": "Validates the accuracy and completeness of entered data based on defined standards.",
					"name": "Data Checker",
					"description": "Ensures that the data entered adheres to the specified validation rules.",
					"actionPrompt": "Run data validation"
				}
			],
			"description": "An efficient agent for automating data entry tasks in Angular applications.",
			"id": "angular-agent-001",
			"title": "Angular Data Entry Agent",
			"avatarFallback": "/images/avatars/default.png",
			"slug": "angular-data-entry-agent",
			"tags": [
				"Angular", "Data Entry", "Automation"
			],
			"zipFilePath": "/path/to/angular-agent.zip",
			"featured": true,
			"recommended": true,
			"category": "Automation"
		},
		{
			"longDescription": "Next.js Agent facilitates seamless data entry automation in Next.js applications, leveraging server-side rendering and static site generation capabilities.",
			"createdByUser": "adminUser",
			"avatarSrc": "/images/avatars/nextjs_agent.png",
			"action": [
				{
					"detailDescription": "Automates form submissions and data handling processes within Next.js applications.",
					"name": "Form Automator",
					"description": "Streamlines form submission tasks by automating repetitive actions.",
					"actionPrompt": "Initiate form automation"
				}, {
					"detailDescription": "Integrates with databases and external APIs to fetch and process data dynamically.",
					"name": "Data Integrator",
					"description": "Fetches and integrates data from various sources to Next.js applications.",
					"actionPrompt": "Fetch and integrate external data"
				}
			],
			"description": "An efficient agent designed for automating data entry tasks in Next.js applications.",
			"id": "nextjs-agent-001",
			"title": "Next.js Data Entry Agent",
			"avatarFallback": "/images/avatars/default.png",
			"slug": "nextjs-data-entry-agent",
			"tags": [
				"Next.js", "Data Entry", "Automation"
			],
			"zipFilePath": "/path/to/nextjs-agent.zip",
			"featured": true,
			"recommended": true,
			"category": "Automation"
		},
		{
			"longDescription": "Stack AI Agent enhances productivity by automating data analysis and decision-making processes. It leverages advanced AI algorithms to process complex datasets and provide actionable insights.",
			"createdByUser": "adminUser",
			"avatarSrc": "/images/avatars/stack_ai_agent.png",
			"action": [
				{
					"detailDescription": "Analyzes large datasets to identify patterns and trends.",
					"name": "Data Analyst",
					"description": "Performs in-depth analysis of data to extract meaningful insights.",
					"actionPrompt": "Initiate data analysis"
				}, {
					"detailDescription": "Generates predictive models based on historical data.",
					"name": "Predictive Modeler",
					"description": "Builds predictive models to forecast future trends and outcomes.",
					"actionPrompt": "Create predictive model"
				}
			],
			"description": "An intelligent agent for automated data analysis and decision-making using AI.",
			"id": "stack-ai-agent-001",
			"title": "Stack AI Decision Support Agent",
			"avatarFallback": "/images/avatars/default.png",
			"slug": "stack-ai-decision-support-agent",
			"tags": [
				"AI", "Data Analysis", "Decision Support"
			],
			"zipFilePath": "/path/to/stack-ai-agent.zip",
			"featured": true,
			"recommended": true,
			"category": "Artificial Intelligence"
		},
    {
			"longDescription": "The Typescript Agent facilitates streamlined integration of TypeScript into existing web applications, enhancing code robustness and developer productivity.",
			"createdByUser": "typescriptUser",
			"avatarSrc": "/images/avatars/typescript_agent.png",
			"action": [
				{
					"detailDescription": "Converts JavaScript code to TypeScript to leverage TypeScript's static typing features.",
					"name": "Code Converter",
					"description": "Automatically converts JavaScript code to TypeScript, enhancing type safety and code clarity.",
					"actionPrompt": "Convert code to TypeScript"
				}, {
					"detailDescription": "Generates TypeScript declaration files (.d.ts) for existing JavaScript libraries.",
					"name": "Declaration File Generator",
					"description": "Creates TypeScript declaration files for JavaScript libraries, enabling TypeScript integration.",
					"actionPrompt": "Generate declaration files"
				}
			],
			"description": "An agent designed to facilitate TypeScript integration and improve development efficiency.",
			"id": "typescript-agent-001",
			"title": "TypeScript Integration Agent",
			"avatarFallback": "/images/avatars/default.png",
			"slug": "typescript-integration-agent",
			"tags": [
				"TypeScript", "JavaScript", "Integration"
			],
			"zipFilePath": "/path/to/typescript-agent.zip",
			"featured": true,
			"recommended": true,
			"category": "Integration"
		}, {
			"longDescription": "Pandas Agent facilitates data manipulation and analysis using the powerful pandas library in Python. It enables efficient handling of large datasets, providing tools for data cleaning, transformation, and analysis.",
			"createdByUser": "dataScientist01",
			"avatarSrc": "/images/avatars/pandas_agent.png",
			"action": [
				{
					"detailDescription": "Cleans data by handling missing values, duplicates, and data type conversions.",
					"name": "Data Cleaner",
					"description": "Automates data cleaning tasks to ensure data quality and consistency.",
					"actionPrompt": "Initiate data cleaning"
				}, {
					"detailDescription": "Transforms data by applying various operations such as filtering, grouping, and aggregation.",
					"name": "Data Transformer",
					"description": "Performs data transformations to prepare data for analysis.",
					"actionPrompt": "Start data transformation"
				}, {
					"detailDescription": "Analyzes data by generating descriptive statistics and visualizations.",
					"name": "Data Analyzer",
					"description": "Provides insights through data analysis and visualization techniques.",
					"actionPrompt": "Run data analysis"
				}
			],
			"description": "A comprehensive agent for data manipulation and analysis using pandas.",
			"id": "pandas-agent-001",
			"title": "Pandas Data Manipulation Agent",
			"avatarFallback": "/images/avatars/default.png",
			"slug": "pandas-data-manipulation-agent",
			"tags": [
				"Pandas", "Data Manipulation", "Data Analysis", "Python"
			],
			"zipFilePath": "/path/to/pandas-agent.zip",
			"featured": true,
			"recommended": true,
			"category": "Data Science"
		},
        {
			"longDescription": "The Shopify API Agent facilitates seamless integration with Shopify's APIs, enabling efficient data retrieval and management for e-commerce applications.",
			"createdByUser": "adminUser",
			"avatarSrc": "/images/avatars/shopify_api_agent.png",
			"action": [
				{
					"detailDescription": "Fetches product data from Shopify including details like pricing, inventory, and descriptions.",
					"name": "Product Data Fetcher",
					"description": "Retrieves product information from Shopify's API endpoints.",
					"actionPrompt": "Retrieve product data"
				}, {
					"detailDescription": "Updates inventory levels and product details on Shopify based on external data sources.",
					"name": "Inventory Updater",
					"description": "Syncs inventory and updates product details on Shopify.",
					"actionPrompt": "Update inventory"
				}
			],
			"description": "An efficient agent for integrating with Shopify's APIs to manage e-commerce data.",
			"id": "shopify-api-agent-001",
			"title": "Shopify API Integration Agent",
			"avatarFallback": "/images/avatars/default.png",
			"slug": "shopify-api-integration-agent",
			"tags": [
				"Shopify", "API", "E-commerce", "Integration"
			],
			"zipFilePath": "/path/to/shopify-api-agent.zip",
			"featured": true,
			"recommended": true,
			"category": "E-commerce"
		},
		{
			"longDescription": "Codium AI Agent aids in the development and deployment of AI models within coding environments. It integrates seamlessly with popular coding platforms to enhance AI-driven functionalities.",
			"createdByUser": "devTeam",
			"avatarSrc": "/images/avatars/codium.png",
			"action": [
				{
					"detailDescription": "Generates AI models based on user-provided datasets and parameters.",
					"name": "Model Generator",
					"description": "Automates the creation of AI models for various applications.",
					"actionPrompt": "Start model generation"
				}, {
					"detailDescription": "Deploys AI models to specified environments for testing and production use.",
					"name": "Model Deployment",
					"description": "Handles the deployment process of AI models to ensure seamless integration.",
					"actionPrompt": "Initiate model deployment"
				}
			],
			"description": "An advanced agent for developing and deploying AI models within coding environments.",
			"id": "codium-ai-agent-002",
			"title": "Codium AI Agent",
			"avatarFallback": "/images/avatars/default.png",
			"slug": "codium-ai-agent",
			"tags": [
				"AI", "Model Generation", "Deployment"
			],
			"zipFilePath": "/path/to/codium-ai-agent.zip",
			"featured": true,
			"recommended": true,
			"category": "AI Development"
		},
		{
			"longDescription": "Sisense Agent automates data analysis and visualization tasks within Sisense. It helps users efficiently create dashboards and reports by leveraging Sisense's powerful analytics capabilities.",
			"createdByUser": "dataAnalyst",
			"avatarSrc": "/images/avatars/sisense.png",
			"action": [
				{
					"detailDescription": "Generates interactive dashboards based on user-defined parameters.",
					"name": "Dashboard Creator",
					"description": "Automates the creation of dashboards to visualize data insights.",
					"actionPrompt": "Create a new dashboard"
				}, {
					"detailDescription": "Schedules regular data updates and report generation.",
					"name": "Report Scheduler",
					"description": "Automates the scheduling of data updates and report generation tasks.",
					"actionPrompt": "Set up report schedule"
				}
			],
			"description": "An advanced agent for automating data analysis and reporting tasks in Sisense.",
			"id": "sisense-agent-002",
			"title": "Sisense Data Analysis Agent",
			"avatarFallback": "/images/avatars/default.png",
			"slug": "sisense-data-analysis-agent",
			"tags": [
				"Sisense", "Data Analysis", "Automation"
			],
			"zipFilePath": "/path/to/sisense-agent.zip",
			"featured": true,
			"recommended": true,
			"category": "Data Analysis"
		}, 
        {
			"longDescription": "Data Analyst Assistant Agent helps in analyzing and visualizing data. It offers a variety of tools to assist data analysts in making data-driven decisions by providing insights and detailed reports.",
			"createdByUser": "adminUser",
			"avatarSrc": "/images/avatars/data_analyst_assistant.png",
			"action": [
				{
					"detailDescription": "Analyzes datasets to identify patterns and trends.",
					"name": "Pattern Analyzer",
					"description": "Automatically examines data to find significant patterns.",
					"actionPrompt": "Start pattern analysis"
				}, {
					"detailDescription": "Generates visual reports from the analyzed data.",
					"name": "Report Generator",
					"description": "Creates detailed visual reports and dashboards.",
					"actionPrompt": "Generate visual report"
				}
			],
			"description": "An intelligent agent designed to assist data analysts with data analysis and visualization.",
			"id": "data-analyst-assistant-001",
			"title": "Data Analyst Assistant Agent",
			"avatarFallback": "/images/avatars/default.png",
			"slug": "data-analyst-assistant-agent",
			"tags": [
				"Data Analysis", "Visualization", "Reports"
			],
			"zipFilePath": "/path/to/data-analyst-assistant.zip",
			"featured": true,
			"recommended": true,
			"category": "Data Analysis"
		}, {
			"longDescription": "SAP Assistant Agent aids in automating routine tasks within SAP environments. It helps streamline workflows, automate repetitive tasks, and enhance productivity by integrating seamlessly with SAP systems.",
			"createdByUser": "adminUser",
			"avatarSrc": "/images/avatars/SAP.png",
			"action": [
				{
					"detailDescription": "Automates data entry processes in SAP modules such as finance, HR, and logistics.",
					"name": "SAP Data Entry",
					"description": "Facilitates automated data entry in various SAP modules to save time and reduce errors.",
					"actionPrompt": "Start SAP data entry automation"
				}, {
					"detailDescription": "Generates reports and insights based on SAP data.",
					"name": "Report Generator",
					"description": "Creates detailed reports and analytics from SAP data to aid in decision-making.",
					"actionPrompt": "Generate SAP reports"
				}
			],
			"description": "An efficient agent for automating tasks and generating insights within SAP systems.",
			"id": "sap-assistant-001",
			"title": "SAP Assistant Agent",
			"avatarFallback": "/images/avatars/default.png",
			"slug": "sap-assistant-agent",
			"tags": [
				"SAP", "Automation", "Data Entry", "Reporting"
			],
			"zipFilePath": "/path/to/sap-assistant-agent.zip",
			"featured": true,
			"recommended": true,
			"category": "Automation"
		}
  ];