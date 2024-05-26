import { fireEvent, render, waitFor } from '@testing-library/react';
import renderer from "react-test-renderer"
import { useDispatch } from 'react-redux';
import { deleteUser } from '@/redux/actions/userAction';
import { showSnackbar } from "@/redux/actions/visualsAction";

import UserCard from './UserCard';

jest.mock("@/redux/actions/userAction", () => ({
    deleteUser: jest.fn(),
    getUsers: jest.fn(),
}))

jest.mock("@/redux/actions/visualsAction", () => ({
    showSnackbar: jest.fn(),
}))

jest.mock("react-redux", () => ({
    useDispatch: jest.fn()
}))

describe("<UserCard />", () => {
    let dispatchMock

    beforeEach(() => {
        dispatchMock = jest.fn()
        useDispatch.mockReturnValue(dispatchMock)

        jest.clearAllMocks()
    })

    it("should render UserCard correctly", () => {
        const domTree = renderer.create(
            <UserCard 
                userid={1}
                name="Test Name"
                email="test@ksp.com.mx"
                createdAt="2024-05-08T01:18:23.033930Z"
            />
        ).toJSON()
    
        expect(domTree).toMatchSnapshot()
    })

    describe("when delete button is clicked", () => {
        it("should show confirmation modal", () => {
            const { getByTestId, getByText, queryByText } = render(
                <UserCard 
                    userid={1}
                    name="Test Name"
                    email="test@ksp.com.mx"
                    createdAt="2024-05-08T01:18:23.033930Z"
                />
            )

            expect(queryByText("¿Desea eliminar a este usuario?")).not.toBeInTheDocument()

            const deleteButton = getByTestId("delete-button")
            fireEvent.click(deleteButton)

            expect(getByText("¿Desea eliminar a este usuario?")).toBeInTheDocument()
        })

        describe("and cancel button is clicked", () => {
            it("should not delete the user and close the modal", () => {
                const { getByTestId, queryByText, getByText } = render(
                    <UserCard 
                        userid={1}
                        name="Test Name"
                        email="test@ksp.com.mx"
                        createdAt="2024-05-08T01:18:23.033930Z"
                    />
                )

                expect(queryByText("¿Desea eliminar a este usuario?")).not.toBeInTheDocument()

                const deleteButton = getByTestId("delete-button")
                fireEvent.click(deleteButton)
                
                expect(getByText("¿Desea eliminar a este usuario?")).toBeInTheDocument()

                const dialogCancelButton = getByTestId("dialog-cancel-button")
                fireEvent.click(dialogCancelButton)

                expect(deleteUser).not.toBeCalled()

                waitFor(() => {
                    expect(queryByText("¿Desea eliminar a este usuario?")).not.toBeInTheDocument()
                })
            })
        })

        describe("and delete button is clicked", () => {
            it("should delete the user and close the modal", () => {
                dispatchMock.mockReturnValue({
                    setUserDeletedSuccessfully: true
                })

                const { getByTestId, queryByText, getByText } = render(
                    <UserCard 
                        userid={1}
                        name="Test Name"
                        email="test@ksp.com.mx"
                        createdAt="2024-05-08T01:18:23.033930Z"
                    />
                )

                expect(queryByText("¿Desea eliminar a este usuario?")).not.toBeInTheDocument()

                const deleteButton = getByTestId("delete-button")
                fireEvent.click(deleteButton)
                
                expect(getByText("¿Desea eliminar a este usuario?")).toBeInTheDocument()

                const dialogDeleteButton = getByTestId("dialog-delete-button")
                fireEvent.click(dialogDeleteButton)

                expect(deleteUser).toBeCalled()

                waitFor(() => {
                    expect(queryByText("¿Desea eliminar a este usuario?")).not.toBeInTheDocument()
                })
            })
            
            describe("when the user is deleted successfully", () => {
                it("should show snackbar with success message", async () => {
                    dispatchMock.mockReturnValue({
                        setUserDeletedSuccessfully: true
                    })
    
                    const { getByTestId } = render(
                        <UserCard 
                            userid={1}
                            name="Test Name"
                            email="test@ksp.com.mx"
                            createdAt="2024-05-08T01:18:23.033930Z"
                        />
                    )
    
                    const deleteButton = getByTestId("delete-button")
                    await fireEvent.click(deleteButton)
                    
                    const dialogDeleteButton = getByTestId("dialog-delete-button")
                    await fireEvent.click(dialogDeleteButton)
    
                    expect(deleteUser).toBeCalledWith(1)
                    expect(showSnackbar).toBeCalledWith("Usuario eliminado satisfactoriamente", "success")
                })
            })
            
            describe("when the user is NOT deleted successfully", () => {
                it("should show snackbar with success message", async () => {
                    dispatchMock.mockReturnValue({
                        setUserDeletedSuccessfully: false
                    })
    
                    const { getByTestId } = render(
                        <UserCard 
                            userid={1}
                            name="Test Name"
                            email="test@ksp.com.mx"
                            createdAt="2024-05-08T01:18:23.033930Z"
                        />
                    )
    
                    const deleteButton = getByTestId("delete-button")
                    await fireEvent.click(deleteButton)
                    
                    const dialogDeleteButton = getByTestId("dialog-delete-button")
                    await fireEvent.click(dialogDeleteButton)
    
                    expect(deleteUser).toBeCalledWith(1)
                    expect(showSnackbar).toBeCalledWith("Error al eliminar", "error")
                })
            })
        })
    })
})