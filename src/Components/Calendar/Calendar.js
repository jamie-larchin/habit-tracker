import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";

import { Button, Icon } from "..";

class Calendar extends Component {
    state = {
        date: moment()
    };

    handleNav = type => {
        this.setState(prevState => ({
            date:
                type === "prev"
                    ? prevState.date.subtract(1, "months")
                    : prevState.date.add(1, "months")
        }));
    };

    getFirstDayOfMonth = () => {
        const { date } = this.state;
        return moment(date)
            .startOf("month")
            .format("d");
    };

    getTotalDaysInMonth = () => {
        const { date } = this.state;
        return date.daysInMonth();
    };

    getCurrentDay = () => {
        const { date } = this.state;
        return Number(date.format("D"));
    };

    getMonthName = () => {
        const { date } = this.state;
        return date.format("MMMM");
    };

    getCalendarCells = () => {
        const cells = [];
        for (let i = 0; i < this.getFirstDayOfMonth(); i += 1) {
            cells.push(null);
        }
        for (let d = 1; d <= this.getTotalDaysInMonth(); d += 1) {
            cells.push(d);
        }
        if (cells.length % 7 !== 0) {
            const excess = 7 - (cells.length % 7);
            for (let e = 0; e < excess; e += 1) {
                cells.push(null);
            }
        }
        return cells;
    };

    renderCalendarCells = () => {
        return this.getCalendarCells().map((cell, i) => {
            return (
                <Td
                    key={i}
                    isNumbered={!!cell}
                    isToday={cell === this.getCurrentDay()}
                >
                    <Cell>{cell}</Cell>
                </Td>
            );
        });
    };

    getCalendarRows = () => {
        const renderedCalendarCells = this.renderCalendarCells();
        const rows = [];
        let cells = [];
        renderedCalendarCells.forEach((td, i) => {
            if (i === 0 || i % 7 !== 0) {
                cells.push(td);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(td);
            }
            if (i === renderedCalendarCells.length - 1) {
                rows.push(cells);
            }
        });
        return rows;
    };

    renderCalendarRows = () => {
        return this.getCalendarRows().map((row, i) => <tr key={i}>{row}</tr>);
    };

    renderTableHead = () => {
        return (
            <thead>
                <tr>
                    {moment.weekdaysShort().map(day => (
                        <Th key={day}>{day}</Th>
                    ))}
                </tr>
            </thead>
        );
    };

    renderTableBody = () => {
        return <tbody>{this.renderCalendarRows()}</tbody>;
    };

    render() {
        return (
            <section>
                <Header>
                    <h2>{this.getMonthName()}</h2>
                    <Nav>
                        {["prev", "next"].map(navType => {
                            return (
                                <Button
                                    key={navType}
                                    size="secondary"
                                    onClick={() => this.handleNav(navType)}
                                >
                                    <Icon
                                        icon={
                                            navType === "prev"
                                                ? "ChevronLeft"
                                                : "ChevronRight"
                                        }
                                    />
                                </Button>
                            );
                        })}
                    </Nav>
                </Header>
                <Table>
                    {this.renderTableHead()}
                    {this.renderTableBody()}
                </Table>
            </section>
        );
    }
}

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    width: 4.75rem;
`;

const Table = styled.table`
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
`;

const Th = styled.th`
    background-color: ${props => props.theme.dark.bg};
    color: ${props => props.theme.dark.fg};
    border: 1px solid ${props => props.theme.dark.bg};
    padding: 0.75rem;
    font-weight: 500;
`;

const Td = styled.td`
    padding: 0;
    ${props => props.isNumbered && `border: 1px solid ${props.theme.greys.e}`};
    ${props => props.isToday && `background-color ${props.theme.greys.f}`};
`;

const Cell = styled.div`
    height: calc(100vh / 8);
    min-height: 5rem;
    font-weight: 500;
    display: flex;
    padding: 0.5rem;
    border: 0.125rem solid transparent;
    box-sizing: border-box;
`;

export default Calendar;
