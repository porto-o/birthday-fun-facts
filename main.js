function App() {
    const { useState, useEffect } = React;
    const { Container, Form, Button, Card } = ReactBootstrap;

    const [data, setData] = useState("");
    const [day, setDay] = useState("01");
    const [month, setMonth] = useState("01");
    const [year, setYear] = useState("2023");
    const [url, setUrl] = useState(`http://numbersapi.com/${month}/${day}/date`);

    useEffect(() => {
        console.log("Rendering App");
        const fetchData = async () => {
            const res = await axios(url);
            setData(res.data);
            console.log(res.data);
        };
        fetchData();
    }, [year]);

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        const dateObj = new Date(selectedDate);
        dateObj.setDate(dateObj.getDate() + 1);
        const dayValue = String(dateObj.getDate()).padStart(2, "0");
        const monthValue = String(dateObj.getMonth() + 1).padStart(2, "0");

        setDay(dayValue);
        setMonth(monthValue);
    };

    const handleSearchClick = () => {
        setUrl(`http://numbersapi.com/${month}/${day}/date`);
        // random year between 2023 and 2025
        setYear(Math.floor(Math.random() * 3) + 1976);
    };

    return (
        <Container className="mt-4">
            <h1 className="animated-header">Fun fact based on your birthday</h1>
            <Card className="shadow-sm card">
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Select a Date:</Form.Label>
                            <input
                                type="date"
                                value={`2023-${month}-${day}`}
                                onChange={handleDateChange}
                                max="2023-12-31"
                                min="2023-01-01"
                            />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={handleSearchClick}>
                        Search for another fun fact
                    </Button>
                    {data && (
                        <Card className="result-card mt-4">
                            <Card.Body>
                                <Card.Text>{data}</Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
