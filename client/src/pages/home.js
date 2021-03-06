import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TOP_FIVE } from './../utils/queries';
import { useQuery } from '@apollo/client'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const theme = createTheme();

const accordionStyle = {
    marginBottom: '2.5rem',
    border: '1px solid rgba(0, 0, 0, 0.12)'
}

const subjectStyle = {
    color: 'rgba(0, 0, 0, 0.5)'
}

function ArticleAccordion(article) {
    article = article.article
    let link = `read/${article.hash}`
    return (
        <div>
            <Accordion elevation={0} sx={accordionStyle}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{article.title}
                        <Typography sx={subjectStyle}>{article.subject}</Typography>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: 'grey.100', display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
                    <Typography>
                        <Typography sx={subjectStyle}>Author:</Typography>
                        {article.authors}
                    </Typography>
                    <Button variant="contained" href={link} sx={{
                        marginTop: '0.5rem',
                        marginBottom: '0.5rem'
                    }}>
                        Read
                    </Button>
                </AccordionDetails>
            </Accordion>
        </div >
    )
}

export default function HomePage() {
    const { loading, error, data } = useQuery(TOP_FIVE)
    if (loading) {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <h1>loading!</h1>
                </Container>
            </ThemeProvider>
        )
    }
    if (error) {
        console.log(error)
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <h1>Error!</h1>
                </Container>
            </ThemeProvider>
        )
    }
    const topFive = data.getTopFive
    console.log(topFive);
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <h1>Welcome!</h1>
                <h2>Check out these stories...</h2>
                {topFive.map((article) =>
                    <ArticleAccordion article={article} />
                )}
            </Container>
        </ThemeProvider>
    );
}