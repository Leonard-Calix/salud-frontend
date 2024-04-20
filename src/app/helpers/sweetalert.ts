import swal from 'sweetalert2';
declare var $:any;


export const successAlert = (title: string, textMessage: string) => {
    swal.fire({
        title: title,
        text: textMessage,
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-fill btn-success",
        },
        icon: "success"
    })

}

export const showSwal = (type: string, title: string, text:string) => {
    if (type == 'basic') {
        swal.fire({
            title: title,
            buttonsStyling: false,
            customClass: {
                confirmButton: "btn btn-fill btn-success"
            }
        })

    } else if (type == 'title-and-text') {
        swal.fire({
            title: title,
            text: text,
            buttonsStyling: false,
            customClass: {
                confirmButton: "btn btn-fill btn-info"
            }
        })

    } else if (type == 'success-message') {
        swal.fire({
            title: title,
            text: text,
            buttonsStyling: false,
            customClass: {
                confirmButton: "btn btn-fill btn-success",
            },
            icon: "success"
        })

    }
    else if (type == 'warning-message-and-confirmation') {
        swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            customClass: {
                confirmButton: 'btn btn-fill btn-success btn-mr-5',
                cancelButton: 'btn btn-fill btn-danger',
            },
            confirmButtonText: 'Yes, delete it!',
            buttonsStyling: false,

        }).then((result) => {
            if (result.value) {
                swal.fire(
                    {
                        title: 'Deleted!',
                        text: 'Your imaginary file has been deleted.',
                        icon: 'success',
                        customClass: {
                            confirmButton: "btn btn-fill btn-success",
                        },
                        buttonsStyling: false
                    }
                )
            }
        })

    } else if (type == 'warning-message-and-cancel') {
        swal.fire({
            title: text,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            customClass: {
                confirmButton: "btn btn-fill btn-success btn-mr-5",
                cancelButton: "btn btn-fill btn-danger",
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.value) {
                swal.fire({
                    title: 'Deleted!',
                    text: 'Your imaginary file has been deleted.',
                    icon: 'success',
                    customClass: {
                        confirmButton: "btn btn-fill btn-success",
                    },
                    buttonsStyling: false
                })
            } else {
                swal.fire({
                    title: 'Cancelled',
                    text: 'Your imaginary file is safe :)',
                    icon: 'error',
                    customClass: {
                        confirmButton: "btn btn-fill btn-info",
                    },
                    buttonsStyling: false
                })
            }
        })
    } else if (type == 'custom-html') {
        swal.fire({
            title: 'HTML example',
            buttonsStyling: false,
            customClass: {
                confirmButton: "btn btn-fill btn-success",
            },
            html: 'You can use <b>bold text</b>, ' +
                '<a href="https://github.com">links</a> ' +
                'and other HTML tags'
        })

    } else if (type == 'auto-close') {
        swal.fire({
            title: "Auto close alert!",
            text: "I will close in 2 seconds.",
            timer: 2000,
            showConfirmButton: false
        })
    } else if (type == 'input-field') {
        swal.fire({
            title: 'Input something',
            html: '<div class="form-group">' +
                '<input id="input-field" type="text" class="form-control" />' +
                '</div>',
            showCancelButton: true,
            customClass: {
                confirmButton: 'btn btn-fill btn-success btn-mr-5',
                cancelButton: 'btn btn-fill btn-danger',
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.value) {
                swal.fire({
                    icon: 'success',
                    html: 'You entered: <strong>' +
                        $('#input-field').val() +
                        '</strong>',
                    customClass: {
                        confirmButton: 'btn btn-fill btn-success',
                    },
                    buttonsStyling: false

                })
            }
        })
    }
}



