function App() {
    const { useState, useEffect } = React;
    const { Container, Form, Button, Card } = ReactBootstrap;

    const [data, setData] = useState("");
    const [day, setDay] = useState("01");
    const [month, setMonth] = useState("01");
    const [year, setYear] = useState("2023");
    const [url, setUrl] = useState(`http://numbersapi.com/${month}/${day}/date`);
    const [isApiAccessible, setIsApiAccessible] = useState(true);

    useEffect(() => {
        console.log("Rendering App");
        fetchData();
    }, [year]);

    const fetchData = async () => {
        try {
            const res = await fetch(
                `http://numbersapi.com/${month}/${day}/date`
            );
            if (!res.ok) {
                setIsApiAccessible(false);
                throw new Error("Failed to fetch data");
            }
            setIsApiAccessible(true);
            const data = await res.text();
            setData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

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
                    {isApiAccessible ? (
                        data && (
                            <Card className="result-card mt-4">
                                <Card.Body>
                                    <Card.Text>{data}</Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    ) : (
                        <>
                            <div
                                style={{
                                    backgroundColor: "yellow",
                                    padding: "10px",
                                    margin: "10px 0",
                                    borderRadius: "5px",
                                    fontWeight: "bold",
                                }}
                            >
                                I'm sorry, but the Birthday Fun Facts is not currently accessible due
                                to a lack of HTTPS support from the NumbersAPI. However, you can watch the
                                video below to see how it works.
                            </div>
                            <div className="video-container mt-4">
                                <h3>Showcase video</h3>
                                <iframe
                                    width="560"
                                    height="315"
                                    src="./assets/video.mp4"
                                    title="Fun Video"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </>


                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
