// Code generated by go-swagger; DO NOT EDIT.

package shows

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"errors"
	"net/url"
	golangswaggerpaths "path"
	"strings"

	"github.com/go-openapi/swag"
)

// GetShowsShowIDPeopleCsvURL generates an URL for the get shows show ID people csv operation
type GetShowsShowIDPeopleCsvURL struct {
	ShowID int64

	_basePath string
	// avoid unkeyed usage
	_ struct{}
}

// WithBasePath sets the base path for this url builder, only required when it's different from the
// base path specified in the swagger spec.
// When the value of the base path is an empty string
func (o *GetShowsShowIDPeopleCsvURL) WithBasePath(bp string) *GetShowsShowIDPeopleCsvURL {
	o.SetBasePath(bp)
	return o
}

// SetBasePath sets the base path for this url builder, only required when it's different from the
// base path specified in the swagger spec.
// When the value of the base path is an empty string
func (o *GetShowsShowIDPeopleCsvURL) SetBasePath(bp string) {
	o._basePath = bp
}

// Build a url path and query string
func (o *GetShowsShowIDPeopleCsvURL) Build() (*url.URL, error) {
	var _result url.URL

	var _path = "/shows/{showId}/people/csv"

	showID := swag.FormatInt64(o.ShowID)
	if showID != "" {
		_path = strings.Replace(_path, "{showId}", showID, -1)
	} else {
		return nil, errors.New("showId is required on GetShowsShowIDPeopleCsvURL")
	}

	_basePath := o._basePath
	if _basePath == "" {
		_basePath = "/v1"
	}
	_result.Path = golangswaggerpaths.Join(_basePath, _path)

	return &_result, nil
}

// Must is a helper function to panic when the url builder returns an error
func (o *GetShowsShowIDPeopleCsvURL) Must(u *url.URL, err error) *url.URL {
	if err != nil {
		panic(err)
	}
	if u == nil {
		panic("url can't be nil")
	}
	return u
}

// String returns the string representation of the path with query string
func (o *GetShowsShowIDPeopleCsvURL) String() string {
	return o.Must(o.Build()).String()
}

// BuildFull builds a full url with scheme, host, path and query string
func (o *GetShowsShowIDPeopleCsvURL) BuildFull(scheme, host string) (*url.URL, error) {
	if scheme == "" {
		return nil, errors.New("scheme is required for a full url on GetShowsShowIDPeopleCsvURL")
	}
	if host == "" {
		return nil, errors.New("host is required for a full url on GetShowsShowIDPeopleCsvURL")
	}

	base, err := o.Build()
	if err != nil {
		return nil, err
	}

	base.Scheme = scheme
	base.Host = host
	return base, nil
}

// StringFull returns the string representation of a complete url
func (o *GetShowsShowIDPeopleCsvURL) StringFull(scheme, host string) string {
	return o.Must(o.BuildFull(scheme, host)).String()
}